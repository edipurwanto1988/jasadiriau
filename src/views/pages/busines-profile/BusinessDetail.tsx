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

import Skeleton from "@mui/material/Skeleton";
import BusinessValidationItem from "@/views/pages/busines-profile/BusinessValidationItem";

const EditIcon = LoadComponent(() => import("@mui/icons-material/Edit"));

const profile = `${process.env.NEXT_PUBLIC_BASE_URL}/images/placeholder.webp`;

const BusinessDetail = () => {
  const { id } = useParams();
  const router = useRouter();
  const dialog = useDialog();
  const openSnackbar = useSnackbar();

  const [loading, setLoading] = React.useState(true);
  const [tab, setTab] = React.useState("overview");
  const [isPending, startTransaction] = React.useTransition();
  const [data, setData] = React.useState<BusinessProfile>({
    id: 0,
    businessName: "",
    status: "pending",
    imageUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/images/placeholder.webp`,
  });

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  const mutation = useMutation({
    defaultValue: {
      image: inputImage,
    },
  });

  const fetchData = () => {
    getBusinessProfileID({ params: { id } })
      .then((resp) => {
        startTransaction(() => {
          mutation.setData({
            image: {
              entityType: "profile",
              entityId: +id!,
            },
          });

          setData(resp.data);
        });
      })
      .catch((e) => {})
      .finally(() => {
        setLoading(false);
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
  }, [id]);

  return (
    <PageTemplate
      title={data.businessName}
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
                  src={data.imageUrl ?? profile}
                  alt={data.businessName}
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
                    loading ? <Skeleton width={100} /> : data.businessName
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

              <StatusChip status={data.status} icon />
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
                      !(data.validations ?? []).some((v) => v.action === null)
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

                  <Fade in={loading} unmountOnExit>
                    <Skeleton width={"80%"} />
                  </Fade>
                  <Box>
                    <Typography variant="subtitle1">
                      {data.description ?? "Tidak ada deskripsi"}
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
                    <Fade in={loading} unmountOnExit>
                      <Skeleton width={"80%"} />
                    </Fade>
                    <BusinessWebsiteItem
                      loading={loading}
                      url={data.websiteUrl}
                    />
                    <BusinessContactItem
                      loading={loading}
                      data={data.businessContact ?? []}
                    />
                    <BusinessSocialItem
                      loading={loading}
                      data={data.businessSocial ?? []}
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
                  data={data.validations ?? []}
                  loading={loading}
                />
              </div>
            </Fade>
          </Box>
        </Stack>
        <Toolbar />
        <Toolbar />
        <SnacbarLoading loading={loading} pending={isPending} />
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
};

export default BusinessDetail;
