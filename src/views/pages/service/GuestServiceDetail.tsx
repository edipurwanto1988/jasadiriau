"use client";

import React from "react";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Stack from "@mui/material/Stack";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import BusinessContactItem from "../busines-profile/BusinessContactItem";
import BusinessLocationlItem from "../busines-profile/BusinessLocationlItem";
import BusinessSocialItem from "../busines-profile/BusinessSocialItem";
import BusinessWebsiteItem from "../busines-profile/BusinessWebsiteItem";
import ServiceGallery from "./ServiceGallery";
import { getServiceBySlug } from "@/actions/service.action";
import { postServiceView } from "@/views/services/interactive.service";
import dynamic from "next/dynamic";

const ServiceRelated = dynamic(() => import("./ServiceRelated"), {
  ssr: false,
});

type Props = {
  data: Awaited<ReturnType<typeof getServiceBySlug>>;
};

const GuestServiceDetail = ({ data }: Props) => {
  const [tab, setTab] = React.useState("description");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  React.useEffect(() => {
    if (!data) return;
    postServiceView({ source: "detail", serviceId: data.id });
  }, [data]);

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Tabs
          value={tab}
          onChange={handleChange}
          scrollButtons={true}
          allowScrollButtonsMobile
          sx={{
            borderBottom: "1px solid #e8e8e8",
            "& .MuiButtonBase-root": {
              color: "var(--blue-color)",
              textTransform: "capitalize",
              fontWeight: 700,
              lineHeight: 1.5,
            },
            "& .Mui-selected": {
              color: "text.primary",
            },
          }}
        >
          <Tab value="description" label="Deskripsi" />
          <Tab value="location" label="Lokasi" />
          <Tab value="gallery" label="Galeri" />
        </Tabs>

        <Fade key={"description"} in={tab === "description"} unmountOnExit>
          <Stack
            direction={"column"}
            justifyContent={"center"}
            py={2}
            spacing={2}
          >
            <Stack direction={"column"} spacing={2}>
              <Box>
                <Typography
                  sx={{
                    fontSize: 22,
                    fontWeight: 700,
                    letterSpacing: "-0.015em",
                    lineHeight: 1.25,
                  }}
                >
                  Deskripsi
                </Typography>
              </Box>

              <Box>
                <Typography
                  variant="subtitle1"
                  sx={{ whiteSpace: "pre-line", wordBreak: "break-word" }}
                >
                  {data?.description || "Tidak ada deskripsi"}
                </Typography>
              </Box>
            </Stack>

            <Stack direction={"column"} spacing={3}>
              <Box>
                <Typography
                  sx={{
                    fontSize: 22,
                    fontWeight: 700,
                    letterSpacing: "-0.015em",
                    lineHeight: 1.25,
                  }}
                >
                  Syarat & Ketentuan
                </Typography>
              </Box>

              <Stack direction={"column"} spacing={2}>
                <Box>
                  <Typography
                    variant="subtitle1"
                    sx={{ whiteSpace: "pre-line", wordBreak: "break-word" }}
                  >
                    {data?.terms || "Tidak ada deskripsi"}
                  </Typography>
                </Box>
              </Stack>
            </Stack>

            <Stack direction={"column"} spacing={3}>
              <Typography
                component={"div"}
                sx={{
                  fontSize: 22,
                  fontWeight: 700,
                  letterSpacing: "-0.015em",
                  lineHeight: 1.25,
                }}
              >
                Kontak
              </Typography>

              <Stack direction={"column"} spacing={2}>
                <BusinessWebsiteItem url={data?.businessProfile?.websiteUrl} />
                <BusinessContactItem
                  data={(data?.businessProfile.BusinessContact as any) ?? []}
                />
                <BusinessSocialItem
                  data={(data?.businessProfile.BusinessSocial as any) ?? []}
                />
              </Stack>
            </Stack>
          </Stack>
        </Fade>

        <Fade
          key={"location"}
          in={tab === "location"}
          unmountOnExit
          timeout={{ enter: 1000, exit: 0 }}
        >
          <div>
            <BusinessLocationlItem
              data={(data?.businessProfile.BusinessLocation as any) ?? []}
            />
          </div>
        </Fade>

        <Fade
          key={"gallery"}
          in={tab === "gallery"}
          unmountOnExit
          timeout={{ enter: 1000 }}
        >
          <Stack direction={"column"} spacing={1}>
            <ServiceGallery url={data?.images ?? []} />
          </Stack>
        </Fade>
      </Box>

      <ServiceRelated slug={data?.slug ?? ""} />
    </>
  );
};

export default GuestServiceDetail;
