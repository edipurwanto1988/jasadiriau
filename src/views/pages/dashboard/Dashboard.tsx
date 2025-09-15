"use client";

import List from "@/views/components/base/List";
import LoadComponent from "@/views/components/base/LoadComponent/LoadComponent";
import PageTemplate from "@/views/components/templates/PageTemplate";
import { businessUrl } from "@/views/services/business-profile.service";
import { serviceUrl } from "@/views/services/service.service";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import useSWR from "swr";

const BusinessCenterOutlinedIcon = LoadComponent(
  () => import("@mui/icons-material/BusinessCenterOutlined")
);

const MiscellaneousServicesOutlinedIcon = LoadComponent(
  () => import("@mui/icons-material/MiscellaneousServicesOutlined")
);

const Dashboard = () => {
  const business = useSWR<BusinessProfile[]>(
    `${
      businessUrl.business
    }?status=pending&orderBy=createdAt&order=desc&perPage=${10}`,
    (url) =>
      fetch(url)
        .then((resp) => resp.json())
        .then((resp) => resp.data)
  );

  const businessStats = useSWR<number>(
    `${businessUrl.business}?status=active&perPage=1`,
    (url) =>
      fetch(url)
        .then((resp) => resp.json())
        .then((resp) => resp.total)
  );

  const service = useSWR<Service[]>(
    `${serviceUrl.serviceAccount}?status=pending&orderBy=createdAt&order=desc&perPage=10`,
    (url) =>
      fetch(url)
        .then((resp) => resp.json())
        .then((resp) => resp.data)
  );

    const serviceStats = useSWR<number>(
    `${serviceUrl.serviceAccount}?status=active&perPage=1`,
    (url) =>
      fetch(url)
        .then((resp) => resp.json())
        .then((resp) => resp.total)
  );

  return (
    <PageTemplate title="Dashboard">
      <Stack direction={"column"} p={2} spacing={2}>
        <Stack direction={"row"} spacing={2}>
          <Paper variant="outlined" sx={{ p: 2, flexBasis: "20%" }}>
            <Stack direction={"row"} spacing={2} alignItems={"center"}>
              <BusinessCenterOutlinedIcon fontSize="large" color="disabled" />
              <Stack direction={"column"}>
                <Box>
                  <Typography variant="subtitle2" color="gray">
                    Profil Bisnis
                  </Typography>
                </Box>

                <Box>
                  <Typography fontWeight={600} color="success">
                    {businessStats.data ?? 0} Aktif
                  </Typography>
                </Box>
              </Stack>
            </Stack>
          </Paper>

          <Paper variant="outlined" sx={{ p: 2, flexBasis: "20%" }}>
            <Stack direction={"row"} spacing={2} alignItems={"center"}>
              <MiscellaneousServicesOutlinedIcon fontSize="large" color="disabled" />
              <Stack direction={"column"}>
                <Box>
                  <Typography variant="subtitle2" color="gray">
                    Layanan
                  </Typography>
                </Box>

                <Box>
                  <Typography fontWeight={600} color="success">
                    {serviceStats.data ?? 0} Aktif
                  </Typography>
                </Box>
              </Stack>
            </Stack>
          </Paper>
        </Stack>

        <Stack direction={"row"} spacing={2}>
          <Paper variant="outlined" sx={{ p: 2, flexBasis: "40%" }}>
            <Stack direction={"column"}>
              <Box>
                <Typography fontWeight={600}>Profil Bisnis</Typography>
              </Box>

              <List
                loading={business.isLoading}
                dense
                data={business.data ?? []}
                renderItem={(value) => {
                  return {
                    button: true,
                    buttonProps: {
                      sx: {
                        px: 1,
                      },
                    },
                    primary: value.businessName,
                    secondary: "Menunggu Persetujuan",
                    sx: {
                      px: 0,
                    },
                  };
                }}
              />
            </Stack>
          </Paper>

          <Paper variant="outlined" sx={{ p: 2, flexBasis: "60%" }}>
            <Stack direction={"column"}>
              <Box>
                <Typography fontWeight={600}>Layanan</Typography>
              </Box>

              <List
                loading={service.isLoading}
                dense
                data={service.data ?? []}
                renderItem={(value) => {
                  return {
                    button: true,
                    buttonProps: {
                      sx: {
                        px: 1,
                      },
                    },
                    primary: value.name,
                    secondary: "Menunggu Persetujuan",
                    sx: {
                      px: 0,
                    },
                  };
                }}
              />
            </Stack>
          </Paper>
        </Stack>
      </Stack>
    </PageTemplate>
  );
};

export default Dashboard;
