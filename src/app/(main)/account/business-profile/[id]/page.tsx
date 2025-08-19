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

const EditIcon = LoadComponent(() => import("@mui/icons-material/Edit"));

const profile = `${process.env.NEXT_PUBLIC_BASE_URL}/images/placeholder.webp`;

export default function Page() {
  const { id } = useParams();
  const router = useRouter();
  const dialog = useDialog();
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
                  primary={client.data.businessName}
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
                    <BusinessWebsiteItem url={client.data.websiteUrl} />
                    <BusinessContactItem
                      data={client.data.businessContact ?? []}
                    />
                    <BusinessSocialItem
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
              <Stack direction={"column"} width={400} py={2}>
                {(client.data.validations ?? []).map((value) => (
                  <Paper variant="outlined" key={value.id} sx={{ p: 2 }}>
                    <Stack direction={"column"} spacing={1}>
                      <ActionChip action={value.action} icon />
                      <Typography variant="body2">
                        Divalidasi Tanggal:{" "}
                        {dateFormat(value.validatedAt, { time: true })}
                      </Typography>

                      <ListItemText
                        primary="Catatan"
                        secondary={value.note ?? "-"}
                        slotProps={{
                          primary: {
                            variant: "body2",
                          },
                          secondary: {
                            variant: "body2",
                          },
                        }}
                      />

                      <Typography variant="body2" textAlign={"right"}>
                        Dibuat Tanggal:{" "}
                        {dateFormat(value.createdAt, { time: true })}
                      </Typography>
                    </Stack>
                  </Paper>
                ))}
              </Stack>
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
