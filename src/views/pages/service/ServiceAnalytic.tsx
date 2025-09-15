"use client";
import React from "react";
import DataTablePage from "@/views/components/base/DataTable/DataTablePage";
import PageTemplate from "@/views/components/templates/PageTemplate";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import LoadComponent from "@/views/components/base/LoadComponent/LoadComponent";
import useTable from "ezhooks/lib/useTable";
import { getPagination } from "@/utils/table";
import { useRouter } from "next/navigation";
import { Link } from "react-transition-progress/next";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import dayjs from "dayjs";
import { getServiceInteractive } from "@/views/services/service.service";

const TuneOutlinedIcon = LoadComponent(
  () => import("@mui/icons-material/TuneOutlined")
);

const ServiceAnalytic = () => {
  const router = useRouter();
  const date = dayjs();

  const [openFilter, setOpenFilter] = React.useState(false);

  const table = useTable({
    service: getServiceInteractive,
    selector: (resp) => resp.data,
    total: (resp) => resp.total ?? 0,
    params: {
      start_date: date.startOf("month").format("YYYY-MM-DD"),
      end_date: date.endOf("month").format("YYYY-MM-DD"),
    },
    replaceUrl: true,
    debounceTime: 1000,
    pagination: {
      startPage: 0,
      perPage: 25,
    },
  });

  const onClickFilter = () => {
    setOpenFilter(true);
  };

  const onCloseFilter = () => {
    setOpenFilter(false);
    table.setQuery({
      start_date: date.startOf("month").format("YYYY-MM-DD"),
      end_date: date.endOf("month").format("YYYY-MM-DD"),
    });
  };

  const onSubmitFilter = (e: React.FormEvent<HTMLFormElement>) => {
    e.stopPropagation();
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    table.setQuery(Object.fromEntries(form.entries()));
    setOpenFilter(false);
  };

  return (
    <PageTemplate
      title="Layanan Interaktif"
      onReload={table.reload}
      onBack={router.back}
    >
      <Stack direction={"column"}>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          spacing={1}
          px={2}
          py={0.5}
          sx={{ borderBottom: 1, borderColor: "divider" }}
        >
          <Stack
            flexGrow={1}
            direction={"row"}
            alignItems={"center"}
            spacing={1}
          >
            <Box>
              <Typography variant="subtitle2">Periode Waktu :</Typography>
            </Box>
            <Stack direction={"row"} alignItems={"center"} spacing={1}>
              <Typography variant="subtitle2">
                {table.query("start_date", "")} s/d{" "}
                {table.query("end_date", "")}
              </Typography>
            </Stack>
          </Stack>

          <Box>
            <IconButton size="small" onClick={onClickFilter}>
              <TuneOutlinedIcon fontSize="inherit" />
            </IconButton>
          </Box>
        </Stack>
        <DataTablePage
          data={table.data}
          loading={table.loading}
          tableProps={{ size: "small" }}
          column={[
            {
              label: "Nama Layanan",
              value: (value) => (
                <Link href={`business-profile/${value.id}`} prefetch={false}>
                  {value.name}
                </Link>
              ),
              sx: (theme) => ({
                [theme.breakpoints.between("xs", "sm")]: {
                  whiteSpace: "nowrap",
                },
                py: `2px !important`,
              }),
              filter: {
                type: "text",
                value: table.query("name", ""),
                onChange: (e) => table.setQuery({ name: e.target.value }),
              },
            },

            {
              label: "Periode",
              head: { align: "center" },
              value: (value) => (
                <Typography variant="subtitle2">{value.total} views</Typography>
              ),
              align: "center",
              sx: {
                py: `2px !important`,
              },
            },
            {
              label: "Aktivitas Terakhir",
              head: { align: "center" },
              value: (value) => {
                const current = value.views.at(0);
                if (!current) {
                  return "";
                }
                return (
                  <ListItemText
                    primary={current.date}
                    secondary={`${current.total} view(s)`}
                    slotProps={{
                      primary: {
                        variant: "subtitle2",
                      },
                      secondary: {
                        variant: "subtitle2",
                      },
                    }}
                    sx={{ p: 0, m: 0 }}
                  />
                );
              },
              align: "center",
              sx: {
                py: `2px !important`,
              },
            },
            {
              label: "Total",
              head: { align: "center" },
              value: (value) => (
                <Typography variant="subtitle2">{value.all} views</Typography>
              ),
              align: "center",
              sx: {
                py: `2px !important`,
              },
            },
          ]}
          pagination={getPagination(table.pagination)}
        />
      </Stack>

      <Drawer
        open={openFilter}
        anchor="right"
        slotProps={{
          paper: {
            sx: {
              width: "25%",
            },
          },
        }}
      >
        <Stack
          component={"form"}
          noValidate
          flex={1}
          direction={"column"}
          justifyContent={"space-between"}
          spacing={2}
          sx={{
            px: 2,
            py: 3,
          }}
          onSubmit={onSubmitFilter}
        >
          <Stack direction={"column"} spacing={2}>
            <Box>
              <Typography>Periode Waktu</Typography>
            </Box>

            <Stack direction={"column"} spacing={3}>
              <TextField
                label="Tanggal Mulai"
                type="date"
                name="start_date"
                variant="outlined"
                defaultValue={table.query("start_date", "")}
              />
              <TextField
                label="Tanggal Berakhir"
                type="date"
                name="end_date"
                variant="outlined"
                defaultValue={table.query("end_date", "")}
              />
            </Stack>
          </Stack>

          <Stack direction={"row"} spacing={1}>
            <Button variant="outlined" fullWidth onClick={onCloseFilter}>
              Reset
            </Button>
            <Button type="submit" variant="contained" fullWidth>
              Simpan
            </Button>
          </Stack>
        </Stack>
      </Drawer>
    </PageTemplate>
  );
};

export default ServiceAnalytic;
