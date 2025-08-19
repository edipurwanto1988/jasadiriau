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
import LoadComponent from "@/views/components/base/LoadComponent/LoadComponent";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import { useSnackbar } from "@/views/contexts/SnackbarContext";
import { getBusinessProfileID } from "@/views/services/business-profile.service";
import useRequest from "ezhooks/lib/useRequest";
import { useParams, useRouter } from "next/navigation";
import BusinessSocialItem from "@/views/pages/busines-profile/BusinessSocialItem";
import BusinessContactItem from "@/views/pages/busines-profile/BusinessContactItem";
import BusinessWebsiteItem from "@/views/pages/busines-profile/BusinessWebsiteItem";
import ProfileUpload from "@/views/pages/image/ProfileUpload";
import useDialog from "@/views/hooks/useDialog";
import useMutation from "ezhooks/lib/useMutation";
import { inputImage } from "@/lib/dummy";
import { postImage } from "@/views/services/image.service";
import StatusChip from "@/views/components/base/Chip/StatusChip";
import Badge from "@mui/material/Badge";
import Image from "next/image";
import Paper from "@mui/material/Paper";
import ActionChip from "@/views/components/base/Chip/ActionChip";
import { dateFormat } from "@/utils/format";
import Skeleton from "@mui/material/Skeleton";
import BusinessValidationItem from "@/views/pages/busines-profile/BusinessValidationItem";
import { useAlert } from "@/views/contexts/AlertContext";
import { postValidation } from "@/views/services/validation.service";

const EditIcon = LoadComponent(() => import("@mui/icons-material/Edit"));

const profile = `${process.env.NEXT_PUBLIC_BASE_URL}/images/placeholder.webp`;

export default function Page() {
  const { id } = useParams();
  const router = useRouter();
  const dialog = useDialog();
  const alert = useAlert();
  const openSnackbar = useSnackbar();
  const [tab, setTab] = React.useState("overview");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  const mutation = useMutation({
    defaultValue: {
      image: inputImage,
    },
  });

  const client = useRequest<BusinessProfile>({
    data: {
      id: 0,
      businessName: "",
      status: "pending",
      imageUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/images/placeholder.webp`,
    },
  });

  const fetchData = () => {
    client.exec({
      service: (event) => getBusinessProfileID({ ...event, params: { id } }),
      onSuccess: (resp) => {
        mutation.setData({
          image: {
            entityType: "profile",
            entityId: +id!,
          },
        });
        return resp.data;
      },
    });
  };

  const onSaveImage = (blob: Blob, close: () => void) => {
    mutation.send({
      data: {
        ...mutation.data().image,
        file: new File([blob], `cropped.webp`, {
          type: blob.type,
          lastModified: Date.now(),
        }),
      },
      service: postImage,
      onSuccess: (resp) => {
        fetchData();
        openSnackbar("Profil baru berhasil diunggah.");
        close();
      },
    });
  };

  const onClickValidation = React.useCallback(
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
            mutation.send({
              data: { id, action, note: remark },
              service: postValidation,
              onSuccess: () => {
                openSnackbar(
                  action === "approved"
                    ? "Permintaan berhasil disetujui."
                    : "Permintaan berhasil ditolak."
                );
                alert.reset();
                fetchData();
              },
              onAlways: () => {
                alert.set({ loading: false });
              },
            });
          },
        },
      });
    },
    [client.data.validations]
  );

  React.useEffect(() => {
    if (!id) return;

    fetchData();
    return () => {
      client.cancel();
    };
  }, [id]);

  return (
    <PageTemplate
      title={client.data.businessName}
      onReload={fetchData}
      onUpdate={() => {
        router.push(`${id}/update`);
      }}
      onDelete={console.log}
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
                  src={client.data.imageUrl ?? profile}
                  alt={client.data.businessName}
                  width={128}
                  height={128}
                  priority
                  style={{ objectFit: "cover" }}
                />
              </Box>

              <Box>
                <Button
                  size="small"
                  endIcon={<EditIcon fontSize="inherit" />}
                  onClick={dialog.openDialog}
                >
                  Ubah Profil
                </Button>
              </Box>
            </Stack>

            <Stack direction={"column"} justifyContent={"flex-start"}>
              <Box>
                <ListItemText
                  primary={
                    client.loading ? (
                      <Skeleton width={100} />
                    ) : (
                      client.data.businessName
                    )
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

              <StatusChip status={client.data.status} icon />
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
                      !(client.data.validations ?? []).some(
                        (v) => v.action === null
                      )
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

                  <Fade in={client.loading} unmountOnExit>
                    <Skeleton width={"80%"} />
                  </Fade>
                  <Box>
                    <Typography variant="subtitle1">
                      {client.data.description ?? "Tidak ada deskripsi"}
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
                    <Fade in={client.loading} unmountOnExit>
                      <Skeleton width={"80%"} />
                    </Fade>
                    <BusinessWebsiteItem
                      loading={client.loading}
                      url={client.data.websiteUrl}
                    />
                    <BusinessContactItem
                      loading={client.loading}
                      data={client.data.businessContact ?? []}
                    />
                    <BusinessSocialItem
                      loading={client.loading}
                      data={client.data.businessSocial ?? []}
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
                  data={client.data.validations ?? []}
                  loading={client.loading}
                  onValidation={onClickValidation}
                />
              </div>
            </Fade>
          </Box>
        </Stack>
        <Toolbar />
        <Toolbar />
        <SnacbarLoading loading={client.loading} />
        <ProfileUpload
          dialog={dialog}
          onSave={(img, close) => {
            console.log(img);
            onSaveImage(img as Blob, close);
          }}
        />
      </Box>
    </PageTemplate>
  );
}
