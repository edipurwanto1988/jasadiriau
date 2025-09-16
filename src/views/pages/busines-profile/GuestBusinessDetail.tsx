"use client";
import React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import BusinessSocialItem from "@/views/pages/busines-profile/BusinessSocialItem";
import BusinessContactItem from "@/views/pages/busines-profile/BusinessContactItem";
import BusinessWebsiteItem from "@/views/pages/busines-profile/BusinessWebsiteItem";
import ServiceListCard from "../service/ServiceListCard";
import BusinessLocationlItem from "./BusinessLocationlItem";
import { postBusinessView } from "@/views/services/interactive.service";

const GuestBusinessDetail = ({ data }: { data: BusinessProfile }) => {
  const [tab, setTab] = React.useState("overview");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  React.useEffect(() => {
    if (!data) return;
    postBusinessView({ source: "detail", profileId: data.id });
  }, [data]);
  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={tab}
        onChange={handleChange}
        sx={{
          borderBottom: "1px solid #e8e8e8",
          "& .MuiButtonBase-root": {
            color: "var(--blue-color)",
            textTransform: "capitalize",
            fontWeight: 700,
            lineHeight: 1.5,
            "&.Mui-selected": {
              color: "text.primary",
            },
          },
        }}
      >
        <Tab value="overview" label="Umum" />
        <Tab value="location" label="Lokasi" />
        <Tab value="service" label="Layanan" />
      </Tabs>

      <Fade
        key={"overview"}
        in={tab === "overview"}
        unmountOnExit
        timeout={{ enter: 1000, exit: 0 }}
      >
        <Stack
          direction={"column"}
          justifyContent={"center"}
          spacing={3}
          py={2}
        >
          <Stack direction={"column"} spacing={2}>
            <Typography
              component={"div"}
              sx={{
                fontSize: 22,
                fontWeight: 700,
                letterSpacing: "-0.015em",
                lineHeight: 1.25,
              }}
            >
              Deskripsi
            </Typography>

            <Box>
              <Typography
                variant="subtitle1"
                sx={{ whiteSpace: "pre-line", wordBreak: "break-word" }}
              >
                {data?.description || "Tidak ada deskripsi."}
              </Typography>
            </Box>
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
              <BusinessWebsiteItem url={data?.websiteUrl} />
              <BusinessContactItem data={data?.businessContact ?? []} />
              <BusinessSocialItem data={data?.businessSocial ?? []} />
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
          <BusinessLocationlItem data={data?.businessLocation ?? []} />
        </div>
      </Fade>

      <Fade
        key={"service"}
        in={tab === "service"}
        unmountOnExit
        timeout={{ enter: 1000, exit: 0 }}
      >
        <div>
          <ServiceListCard isGuest={true} data={data?.services ?? []} />
        </div>
      </Fade>
    </Box>
  );
};

export default GuestBusinessDetail;
