"use client";
import React from "react";
import SnacbarLoading from "@/views/components/base/Skeleton/SnacbarLoading";
import PageTemplate from "@/views/components/templates/PageTemplate";
import { useSnackbar } from "@/views/contexts/SnackbarContext";
import useZod from "@/views/hooks/useZod";
import {
  getBusinessProfileID,
  postBusinessProfile,
} from "@/views/services/business-profile.service";
import useMutation from "ezhooks/lib/useMutation";
import useRequest from "ezhooks/lib/useRequest";
import { useParams, useRouter } from "next/navigation";
import { dummyBusinessProfile } from "@/lib/dummy";
import { updateBusinessProfileSchema } from "@/schema/business-profile.schema";
import { ccFormat, parseFormData } from "@/utils/format";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { statusActiveLabel, ucwords } from "@/utils/string";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import LoadComponent from "@/views/components/base/LoadComponent/LoadComponent";
import Fade from "@mui/material/Fade";
import Overview from "../_partial/Overview";
import Card from "@mui/material/Card";
import { CardHeader, CardContent } from "@mui/material";

export default function Page() {
  const { id } = useParams();
  const router = useRouter();

  const [tab, setTab] = React.useState("overview");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };
  const openSnackbar = useSnackbar();

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
    <PageTemplate
      title={client.data.businessName}
      onReload={fetchData}
      onUpdate={()=>{
        router.push(`${id}/update`)
      }}
      onDelete={console.log}
      onBack={router.back}
    >
      <Box sx={{ width: "100%" }}>
        <Tabs
          value={tab}
          onChange={handleChange}
          sx={{ borderBottom: "1px solid #e8e8e8" }}
        >
          <Tab value="overview" label="Informasi" />
          <Tab value="description" label="Deskripsi" />
          <Tab value="galeri" label="Galeri" />
          <Tab value="service" label="Layanan" />
        </Tabs>

        <Fade key={"overview"} in={tab === "overview"} unmountOnExit>
          <Stack direction={"row"} justifyContent={"center"}>
            <Stack direction={"column"} flexBasis={"60%"} p={2} spacing={2}>
              <Overview loading={client.loading} data={client.data} />
            </Stack>
          </Stack>
        </Fade>

        <Fade key={"description"} in={tab === "description"} unmountOnExit>
          <Stack direction={"row"} justifyContent={"center"}>
            <Stack direction={"column"} flexBasis={"60%"} p={2} spacing={2}>
              <Card square variant="outlined" sx={{ width: "100%" }}>
                <CardHeader
                  title="Deskripsi"
                  slotProps={{
                    title: {
                      variant: "subtitle1",
                    },
                  }}
                  sx={{ borderBottom: 1, borderColor: "divider" }}
                />
                <CardContent>{client.data.description || "-"}</CardContent>
              </Card>
            </Stack>
          </Stack>
        </Fade>
      </Box>
    </PageTemplate>
  );
}
