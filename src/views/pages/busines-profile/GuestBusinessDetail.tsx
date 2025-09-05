"use client";

import React from "react";
import Stack from "@mui/material/Stack";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import BusinessSocialItem from "@/views/pages/busines-profile/BusinessSocialItem";
import BusinessContactItem from "@/views/pages/busines-profile/BusinessContactItem";
import BusinessWebsiteItem from "@/views/pages/busines-profile/BusinessWebsiteItem";
import Image from "next/image";
import MainTemplate from "@/views/components/templates/MainTemplate";
import ServiceListCard from "../service/ServiceListCard";
import BusinessLocationlItem from "./BusinessLocationlItem";
import Breadcrumbs from "@/views/components/base/Breadcrumbs";
import { useRouter } from "next/navigation";
import ButtonWithIcon from "@/views/components/base/Button/ButtonWithIcon";

const profile = `${process.env.NEXT_PUBLIC_BASE_URL}/images/placeholder.webp`;

const GuestBusinessDetail = ({
  data,
  siteName,
}: {
  data: BusinessProfile;
  siteName: string | null;
}) => {
  const router = useRouter();
  const [tab, setTab] = React.useState("overview");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };
  return (
    <MainTemplate>
      <Box sx={{ width: "100%", minHeight: "100%", overflow: "hidden auto" }}>
        <Stack
          direction={"column"}
          spacing={3}
          px={{
            xs: 2,
            sm: 2,
            md: 0,
            lg: 0,
            xl: 0,
          }}
          py={{
            xs: 2,
            sm: 2,
            md: 0,
            lg: 0,
            xl: 0,
          }}
        >
          <Stack direction={"column"} spacing={1}>
            <Box>
              <ButtonWithIcon
                icon="ArrowBackOutlinedIcon"
                position="start"
                onClick={router.back}
              >
                Kembali
              </ButtonWithIcon>
            </Box>
            <Breadcrumbs
              boxProps={{
                sx: {
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                },
              }}
            />
          </Stack>

          <Stack
            direction={{
              xs: "column",
              sm: "column",
              md: "row",
              lg: "row",
              xl: "row",
            }}
            spacing={2}
          >
            <Stack flexGrow={1} direction={"row"} spacing={2}>
              <Stack direction={"column"} alignItems={"center"} spacing={1}>
                <Box
                  sx={{
                    position: "relative",
                    overflow: "hidden",
                    width: 128,
                    height: 128,
                    borderRadius: "8px",
                    backgroundColor: "var(--input-bg-color)",
                    border: 1,
                    borderColor: "divider",
                  }}
                >
                  <Image
                    src={data?.imageUrl ?? profile}
                    alt={data?.businessName ?? "profile"}
                    fill
                    priority
                    style={{ objectFit: "cover" }}
                  />
                </Box>
              </Stack>

              <Stack direction={"column"} justifyContent={"flex-start"}>
                <Box>
                  <ListItemText
                    primary={data?.businessName}
                    secondary={"Kategori"}
                    slotProps={{
                      primary: {
                        component: "h1",
                        fontSize: 22,
                        fontWeight: 700,
                        letterSpacing: "-0.015em",
                        lineHeight: 1.25,
                      },
                      secondary: {
                        variant: "subtitle1",
                        color: "var(--blue-color)",
                        fontWeight: 400,
                      },
                    }}
                  />
                </Box>
              </Stack>
            </Stack>

            <Box>
              {(data.businessContact ?? [])
                .filter((_, i) => i === 0)
                .map((v, i) => (
                  <ButtonWithIcon
                    key={i}
                    disabled={!data.businessContact?.length}
                    position="start"
                    icon="WAIcon"
                    variant="contained"
                    fullWidth
                    disableElevation
                    size="large"
                    sx={{
                      backgroundColor: "var(--wa-color2)",
                      whiteSpace: "nowrap",
                    }}
                    onClick={() => {
                      const phone = v.whatsappNumber;
                      const text = encodeURIComponent(
                        `Halo, saya menemukan profil layanan Anda di ${siteName}.\nSaya ingin menanyakan lebih lanjut mengenai layanan yang tersedia.\nApakah bisa dibantu?`
                      );
                      router.push(
                        `${process.env.NEXT_PUBLIC_WA_LINK}?phone=${phone}&text=${text}`
                      );
                    }}
                  >
                    Chat Via Whatsapp
                  </ButtonWithIcon>
                ))}
            </Box>
          </Stack>

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
        </Stack>
      </Box>
    </MainTemplate>
  );
};

export default GuestBusinessDetail;
