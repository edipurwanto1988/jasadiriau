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
import Avatar from "@mui/material/Avatar";
import Image from "next/image";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import { useSnackbar } from "@/views/contexts/SnackbarContext";
import { getBusinessProfileID } from "@/views/services/business-profile.service";
import useRequest from "ezhooks/lib/useRequest";
import { ucwords } from "@/utils/string";
import { useParams, useRouter } from "next/navigation";
import BusinessSocialItem from "@/views/pages/busines-profile/BusinessSocialItem";
import BusinessContactItem from "@/views/pages/busines-profile/BusinessContactItem";
import BusinessWebsiteItem from "@/views/pages/busines-profile/BusinessWebsiteItem";
import ProfileUpload from "@/views/pages/image/ProfileUpload";
import useDialog from "@/views/hooks/useDialog";
import useMutation from "ezhooks/lib/useMutation";
import { inputImage } from "@/lib/dummy";
import { postImage } from "@/views/services/image.service";

const EditIcon = LoadComponent(() => import("@mui/icons-material/Edit"));

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
              <Avatar
                src={client.data.imageUrl}
                alt={client.data.businessName}
                variant="rounded"
                sx={{ width: 128, height: 128 }}
              />

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

            <Stack direction={"column"}>
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
              <Tab value="galeri" label="Reviews" />
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
