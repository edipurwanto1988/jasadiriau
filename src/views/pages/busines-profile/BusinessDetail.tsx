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
import ValidationItem from "../validation/ValidationItem";
import Skeleton from "@mui/material/Skeleton";
import {
  postNewValidation,
  postValidation,
} from "@/views/services/validation.service";
import { useAlert } from "@/views/contexts/AlertContext";
import { useSnackbar } from "@/views/contexts/SnackbarContext";
import { businessUrl } from "@/views/services/business-profile.service";
import { useRouter } from "next/navigation";
import ServiceListCard from "../service/ServiceListCard";
import BusinessLocationlItem from "./BusinessLocationlItem";

const profile = `${process.env.NEXT_PUBLIC_BASE_URL}/images/placeholder.webp`;

const BusinessDetail = ({ id, role }: { id: number; role?: RoleType }) => {
  const router = useRouter();
  const alert = useAlert();
  const openSnackbar = useSnackbar();
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

  const onValidation = React.useCallback(
    (id: number, action: string) => () => {
      alert.set({
        open: true,
        textfield: true,
        title:
          action === "approved"
            ? "Setujui Permintaan Ini?"
            : "Tolak Permintaan Ini?",
        message:
          action === "approved"
            ? "Tindakan ini akan menyetujui permintaan dan tidak bisa dibatalkan."
            : "Tindakan ini akan menolak permintaan dan mungkin tidak bisa dibatalkan.",
        type: action === "approved" ? "success" : "warning",
        confirm: {
          onClick: (remark) => {
            alert.set({ loading: true });
            postValidation({
              id,
              action: action as ActionType,
              note: remark,
            }).then((resp) => {
              reload();
              openSnackbar(
                action === "approved"
                  ? "Permintaan berhasil disetujui."
                  : "Permintaan berhasil ditolak."
              );
              alert.reset();
            });
          },
        },
      });
    },
    [data?.validations]
  );

  const onResend = React.useCallback(() => {
    alert.set({
      open: true,
      title: "Pengajuan Ulang",
      message:
        "Anda akan melakukan pengajuan ulang, pastikan data sudah lengkap.",
      type: "info",
      confirm: {
        onClick: () => {
          alert.set({ loading: true });
          postNewValidation({
            targetId: +id,
            targetType: "profile",
          }).then((resp) => {
            reload();
            openSnackbar("Pengajuan baru berhasil dibuat");
            alert.reset();
          });
        },
      },
    });
  }, [data?.validations]);

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
                  fill
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
                      fontSize: 18,
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

              <StatusChip status={data?.status ?? "pending"} icon />
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
              <Tab value="overview" label="Umum" />
              <Tab value="location" label="Lokasi" />
              <Tab value="service" label="Layanan" />
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
                      fontSize: 18,
                      fontWeight: 700,
                      letterSpacing: "-0.015em",
                      lineHeight: 1.25,
                    }}
                  >
                    Deskripsi
                  </Typography>

                  <Fade in={isLoading} unmountOnExit>
                    <Skeleton width={"80%"} />
                  </Fade>

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
                      fontSize: 18,
                      fontWeight: 700,
                      letterSpacing: "-0.015em",
                      lineHeight: 1.25,
                    }}
                  >
                    Kontak
                  </Typography>

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

            <Fade
              key={"location"}
              in={tab === "location"}
              unmountOnExit
              timeout={{ enter: 1000, exit: 0 }}
            >
              <div>
                <BusinessLocationlItem
                  loading={isLoading}
                  data={data?.businessLocation ?? []}
                />
              </div>
            </Fade>

            <Fade
              key={"service"}
              in={tab === "service"}
              unmountOnExit
              timeout={{ enter: 1000, exit: 0 }}
            >
              <div>
                <ServiceListCard
                  loading={isLoading}
                  data={data?.services ?? []}
                />
              </div>
            </Fade>

            <Fade
              key={"validation"}
              in={tab === "validation"}
              unmountOnExit
              timeout={{ enter: 1000, exit: 0 }}
            >
              <div>
                <ValidationItem
                  loading={isLoading}
                  data={data?.validations ?? []}
                  onValidation={onValidation}
                  onResend={onResend}
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
