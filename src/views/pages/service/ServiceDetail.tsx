"use client";
import React from "react";
import SnacbarLoading from "@/views/components/base/Skeleton/SnacbarLoading";
import PageTemplate from "@/views/components/templates/PageTemplate";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import ProfileUpload from "@/views/pages/image/ProfileUpload";
import StatusChip from "@/views/components/base/Chip/StatusChip";
import Badge from "@mui/material/Badge";
import Image from "next/image";
import useSWR, { useSWRConfig } from "swr";
import Skeleton from "@mui/material/Skeleton";
import { serviceUrl } from "@/views/services/service.service";
import { useRouter } from "next/navigation";
import useDialog from "@/views/hooks/useDialog";
import ServiceUpdate from "./ServiceUpdate";
import ValidationItem from "../validation/ValidationItem";
import { useAlert } from "@/views/contexts/AlertContext";
import { useSnackbar } from "@/views/contexts/SnackbarContext";
import {
  postNewValidation,
  postValidation,
} from "@/views/services/validation.service";
import ServiceGalleryForm from "./ServiceGalleryForm";
import ServiceGallery from "./ServiceGallery";

const profile = `${process.env.NEXT_PUBLIC_BASE_URL}/images/placeholder.webp`;

const ServiceDetail = ({ id }: { id: number }) => {
  const router = useRouter();
  const dialog = useDialog();
  const alert = useAlert();
  const openSnackbar = useSnackbar();
  const [tab, setTab] = React.useState("description");

  const { mutate } = useSWRConfig();
  const { data, isLoading } = useSWR<Service>(
    `${serviceUrl.serviceAccount}/${id}`,
    (url) =>
      fetch(url)
        .then((resp) => resp.json())
        .then((resp) => resp.data)
  );

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  const reload = () => {
    mutate(`${serviceUrl.serviceAccount}/${id}`);
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
            targetType: "service",
          }).then((resp) => {
            reload();
            openSnackbar("Pengajuan baru berhasil dibuat");
            alert.reset();
          });
        },
      },
    });
  }, [data?.validations]);

  return (
    <PageTemplate
      title={data?.name}
      onReload={reload}
      onUpdate={dialog.openDialog}
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
                  alt={data?.name ?? "service"}
                  fill
                  sizes="100%"
                  priority
                />
              </Box>

              <ProfileUpload entityId={+id!} type="service" callback={reload} />
            </Stack>

            <Stack
              direction={"column"}
              justifyContent={"flex-start"}
              spacing={0.5}
            >
              <Box>
                {isLoading ? (
                  <Skeleton width={200} />
                ) : (
                  <Typography
                    sx={{
                      fontSize: 18,
                      fontWeight: 700,
                      letterSpacing: "-0.015em",
                      lineHeight: 1.25,
                    }}
                  >
                    {data?.name}
                  </Typography>
                )}
              </Box>

              <Box>
                {isLoading ? (
                  <Skeleton width={150} />
                ) : (
                  <Typography
                    component={"a"}
                    href={`/account/business-profile/${data?.profileId}`}
                    variant="subtitle2"
                    sx={{
                      color: "var(--blue-color)",
                      fontWeight: 400,
                      textDecoration:"none"
                    }}
                  >
                    {data?.bussinessName}
                  </Typography>
                )}
              </Box>

              <Box>
                {isLoading ? (
                  <Skeleton width={100} />
                ) : (
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 400,
                    }}
                  >
                    {data?.categoryName}
                  </Typography>
                )}
              </Box>

              <Box>
                <StatusChip status={data?.status ?? "pending"} icon />
              </Box>
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
              <Tab value="description" label="Deskripsi" />
              <Tab value="gallery" label="Galeri" />
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
                        fontSize: 18,
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
                        fontSize: 18,
                        fontWeight: 700,
                        letterSpacing: "-0.015em",
                        lineHeight: 1.25,
                      }}
                    >
                      Syarat & Ketentuan
                    </Typography>
                  </Box>

                  <Stack direction={"column"} spacing={2}>
                    <Fade in={isLoading} unmountOnExit>
                      <Skeleton width={"80%"} />
                    </Fade>

                    <Box>
                      <Typography
                        variant="subtitle1"
                        sx={{ whiteSpace: "pre-line", wordBreak: "break-word" }}
                      >
                        {data?.terms ?? "Tidak ada deskripsi"}
                      </Typography>
                    </Box>
                  </Stack>
                </Stack>
              </Stack>
            </Fade>

            <Fade key={"gallery"} in={tab === "gallery"} unmountOnExit>
              <Stack direction={"column"} spacing={1}>
                <ServiceGalleryForm id={id} />
                <ServiceGallery loading={isLoading} url={data?.images ?? []} />
              </Stack>
            </Fade>

            <Fade key={"validation"} in={tab === "validation"} unmountOnExit>
              <div>
                <ValidationItem
                  data={data?.validations ?? []}
                  loading={isLoading}
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
        <ServiceUpdate id={id} dialog={dialog} callback={reload} />
      </Box>
    </PageTemplate>
  );
};

export default ServiceDetail;
