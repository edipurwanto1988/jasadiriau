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

export default function Page() {
  const { id } = useParams();
  const router = useRouter();

  const [tab, setTab] = React.useState("overview");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

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
        return resp.data;
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
    <Box sx={{ width: "100%", minHeight: "100%", overflow: "hidden auto" }}>
      <Stack direction={"column"} spacing={4} sx={{ px: 3, py: 2 }}>
        <Stack direction={"row"} spacing={2}>
          <Avatar variant="rounded" sx={{ width: 128, height: 128 }} />

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
                  {(client.data.businessSocial ?? []).map((social, i) => (
                    <Stack
                      key={i}
                      direction={"row"}
                      alignItems={"center"}
                      spacing={2}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          backgroundColor: "var(--input-bg-color)",
                          p: 1,
                          borderRadius: "var(--mui-shape-borderRadius)",
                        }}
                      >
                        <Image
                          src={`/icons/${social.platform}.svg`}
                          alt={social.platform}
                          width={24}
                          height={24}
                          loading="lazy"
                        />
                      </Box>
                      <Box flexGrow={1}>
                        <Typography>
                          Ikuti kami di {ucwords(social.platform)}
                        </Typography>
                      </Box>
                      <Box>
                        <Link
                          variant="subtitle1"
                          href={social.url}
                          underline="none"
                          target="_blank"
                          sx={{
                            display: "inline-block",
                            backgroundColor: "var(--input-bg-color)",
                            p: 0.5,
                            textAlign: "center",
                            color: "text.primary",
                            minWidth: 84,
                            borderRadius: "var(--mui-shape-borderRadius)",
                          }}
                        >
                          Ikuti
                        </Link>
                      </Box>
                    </Stack>
                  ))}
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
    </Box>
  );
}
