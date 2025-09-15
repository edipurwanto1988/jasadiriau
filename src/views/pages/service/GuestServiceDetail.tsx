"use client";
import React from "react";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Stack from "@mui/material/Stack";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Breadcrumbs from "@/views/components/base/Breadcrumbs";
import CategoryChip from "@/views/components/base/Chip/CategoryChip";
import ILink from "@/views/components/base/Link/ILink";
import MainTemplate from "@/views/components/templates/MainTemplate";
import BusinessContactItem from "../busines-profile/BusinessContactItem";
import BusinessLocationlItem from "../busines-profile/BusinessLocationlItem";
import BusinessSocialItem from "../busines-profile/BusinessSocialItem";
import BusinessWebsiteItem from "../busines-profile/BusinessWebsiteItem";
import ServiceGallery from "./ServiceGallery";
import { useRouter } from "next/navigation";
import { getServiceBySlug } from "@/actions/service.action";
import { rupiah } from "@/utils/format";
import ButtonWithIcon from "@/views/components/base/Button/ButtonWithIcon";
import BackButton from "@/views/components/base/Button/BackButton";
import {
  postContact,
  postServiceView,
} from "@/views/services/interactive.service";
import ServiceRelated from "./ServiceRelated";

const profile = `${process.env.NEXT_PUBLIC_BASE_URL}/images/placeholder.webp`;

type Props = {
  data: Awaited<ReturnType<typeof getServiceBySlug>>;
  siteName: string | null;
};

const GuestServiceDetail = ({ data, siteName }: Props) => {
  const router = useRouter();
  const [tab, setTab] = React.useState("description");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  React.useEffect(() => {
    if (!data) return;
    postServiceView({ source: "detail", serviceId: data.id });
  }, [data]);

  return (
    <MainTemplate>
      <Box sx={{ width: "100%", minHeight: "100%", overflow: "hidden auto" }}>
        <Stack
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
          spacing={4}
        >
          <Stack spacing={2}>
            <BackButton />
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
                  }}
                >
                  <Image
                    src={data?.imageUrl ?? profile}
                    alt={data?.name ?? "service"}
                    fill
                    sizes="100%"
                    priority
                  />
                </Box>
              </Stack>

              <Stack
                direction={"column"}
                justifyContent={"flex-start"}
                spacing={0.5}
              >
                <Box>
                  <Typography
                    sx={{
                      fontSize: 22,
                      fontWeight: 700,
                      letterSpacing: "-0.015em",
                      lineHeight: 1.25,
                    }}
                  >
                    {data?.name}
                  </Typography>
                </Box>

                <Box>
                  <Typography
                    component={ILink}
                    href={`/penyedia-jasa/${data?.businessProfile?.slug}`}
                    prefetch={false}
                    scroll={false}
                    variant="subtitle2"
                    underline="none"
                    sx={{
                      fontSize: "16px !important",
                      color: "var(--blue-color)",
                      fontWeight: 500,
                    }}
                  >
                    {data?.businessProfile?.businessName}
                  </Typography>
                </Box>

                <Stack direction={"row"} spacing={1}>
                  <CategoryChip label="Jasa" />
                  <CategoryChip label={data?.category?.name} />
                </Stack>
              </Stack>
            </Stack>

            <Stack direction={"column"} spacing={1}>
              <Box>
                <Typography variant="subtitle1" fontWeight={500} align="right">
                  Biaya: {rupiah(data.price)}
                </Typography>
              </Box>
              <Box>
                {(data.businessProfile.BusinessContact ?? [])
                  .filter((_, i) => i === 0)
                  .map((v, i) => (
                    <ButtonWithIcon
                      key={i}
                      icon="WAIcon"
                      position="start"
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
                          `Halo, saya menemukan layanan *${data.name}* di ${siteName}.\n` +
                            `Saya ingin menanyakan lebih lanjut mengenai detail layanan tersebut.\n` +
                            `Apakah bisa dibantu?`
                        );

                        postContact({
                          source: "detail",
                          phoneNumber: v.whatsappNumber,
                          contactId: v.id,
                        });
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
          </Stack>

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
                    <BusinessWebsiteItem
                      url={data?.businessProfile?.websiteUrl}
                    />
                    <BusinessContactItem
                      data={
                        (data?.businessProfile.BusinessContact as any) ?? []
                      }
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
          <Toolbar />
          <Toolbar />
        </Stack>
      </Box>
    </MainTemplate>
  );
};

export default GuestServiceDetail;
