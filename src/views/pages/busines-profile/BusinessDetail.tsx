"use client";
import React from "react";
import SnacbarLoading from "@/views/components/base/Skeleton/SnacbarLoading";
import PageTemplate from "@/views/components/templates/PageTemplate";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import BusinessSocialItem from "@/views/pages/busines-profile/BusinessSocialItem";
import BusinessContactItem from "@/views/pages/busines-profile/BusinessContactItem";
import BusinessWebsiteItem from "@/views/pages/busines-profile/BusinessWebsiteItem";
import ProfileUpload from "@/views/pages/image/ProfileUpload";
import StatusChip from "@/views/components/base/Chip/StatusChip";
import Badge from "@mui/material/Badge";
import Image from "next/image";
import useSWR, { useSWRConfig } from "swr";
import { businessUrl } from "@/views/services/business-profile.service";
import { useRouter } from "next/navigation";

import Skeleton from "@mui/material/Skeleton";
import BusinessValidationItem from "@/views/pages/busines-profile/BusinessValidationItem";

const profile = `${process.env.NEXT_PUBLIC_BASE_URL}/images/placeholder.webp`;

const BusinessDetail = ({ id }: { id: number }) => {
  const router = useRouter();
  const [tab, setTab] = React.useState("overview");

  const { mutate } = useSWRConfig();
  const { data, isLoading } = useSWR<BusinessProfile>(
    `${businessUrl.business}/${id}`,
    (url) =>
      fetch(url)
        .then((resp) => resp.json())
        .then((resp) => resp.data)
  );

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  const reload = () => {
    mutate(`${businessUrl.business}/${id}`);
  };

  return (
    <PageTemplate
      title={data?.businessName}
      onReload={reload}
      onUpdate={() => {
        router.push(`${id}/update`);
      }}
      onBack={router.back}
    >
      <Box sx={{ width: "100%", minHeight: "100%", overflow: "hidden auto" }}>
        <Stack direction={"column"} spacing={4} sx={{ px: 3, py: 2 }}>
          <Stack direction={"row"} spacing={2}>
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
                  alt={data?.businessName ?? "profile"}
                  width={128}
                  height={128}
                  priority
                  style={{ objectFit: "cover" }}
                />
              </Box>

              <ProfileUpload entityId={+id!} callback={reload} />
            </Stack>

            <Stack direction={"column"} justifyContent={"flex-start"}>
              <Box>
                <ListItemText
                  primary={
                    isLoading ? <Skeleton width={100} /> : data?.businessName
                  }
                  secondary={"Kategori"}
                  slotProps={{
                    primary: {
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

              <StatusChip status={data?.status?? "pending"} icon />
            </Stack>
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
                },
                "& .Mui-selected": {
                  color: "text.primary",
                },
              }}
            >
              <Tab value="overview" label="Overview" />
              <Tab value="description" label="Services" />
              <Tab value="review" label="Reviews" />
              <Tab
                value="validation"
                label={
                  <Badge
                    variant="dot"
                    color="error"
                    invisible={
                      !(data?.validations ?? []).some((v) => v.action === null)
                    }
                    sx={{
                      "& .MuiBadge-badge": {
                        top: 11,
                        right: -7,
                      },
                    }}
                  >
                    <Box component={"span"}>validasi</Box>
                  </Badge>
                }
              />
            </Tabs>

            <Fade key={"overview"} in={tab === "overview"} unmountOnExit>
              <Stack direction={"column"} justifyContent={"center"}>
                <Stack direction={"column"} p={2} spacing={2}>
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

                  <Fade in={isLoading} unmountOnExit>
                    <Skeleton width={"80%"} />
                  </Fade>
                  <Box>
                    <Typography variant="subtitle1">
                      {data?.description ?? "Tidak ada deskripsi"}
                    </Typography>
                  </Box>
                </Stack>

                <Stack direction={"column"} p={2} spacing={3}>
                  <Box>
                    <Typography
                      sx={{
                        fontSize: 22,
                        fontWeight: 700,
                        letterSpacing: "-0.015em",
                        lineHeight: 1.25,
                      }}
                    >
                      Kontak
                    </Typography>
                  </Box>

                  <Stack direction={"column"} spacing={2}>
                    <Fade in={isLoading} unmountOnExit>
                      <Skeleton width={"80%"} />
                    </Fade>
                    <BusinessWebsiteItem
                      loading={isLoading}
                      url={data?.websiteUrl}
                    />
                    <BusinessContactItem
                      loading={isLoading}
                      data={data?.businessContact ?? []}
                    />
                    <BusinessSocialItem
                      loading={isLoading}
                      data={data?.businessSocial ?? []}
                    />
                  </Stack>
                </Stack>
              </Stack>
            </Fade>

            <Fade key={"description"} in={tab === "description"} unmountOnExit>
              <Stack direction={"row"} justifyContent={"center"}>
                <Stack
                  direction={"column"}
                  flexBasis={"60%"}
                  p={2}
                  spacing={2}
                ></Stack>
              </Stack>
            </Fade>

            <Fade key={"validation"} in={tab === "validation"} unmountOnExit>
              <div>
                <BusinessValidationItem
                  data={data?.validations ?? []}
                  loading={isLoading}
                />
              </div>
            </Fade>
          </Box>
        </Stack>
        <Toolbar />
        <Toolbar />
        <SnacbarLoading loading={isLoading} />
      </Box>
    </PageTemplate>
  );
};

export default BusinessDetail;
