"use client";
import React from "react";
import DataTablePage from "@/views/components/base/DataTable/DataTablePage";
import Dropdown, {
  DropdownProps,
} from "@/views/components/base/Dropdown/Dropdown";
import PageTemplate from "@/views/components/templates/PageTemplate";
import useTable from "ezhooks/lib/useTable";
import { getPagination } from "@/utils/table";
import { useSnackbar } from "@/views/contexts/SnackbarContext";
import { useAlert } from "@/views/contexts/AlertContext";
import {
  businessUrl,
  deleteAccountBusinessProfile,
  getBusinessProfile,
} from "@/views/services/business-profile.service";
import { useRouter } from "next/navigation";
import Avatar from "@mui/material/Avatar";
import Link from "@mui/material/Link";
import StatusChip from "@/views/components/base/Chip/StatusChip";
import useSWR from "swr";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import RoleComponent from "@/views/components/base/Role/RoleComponent";
import { useAuth } from "@/views/contexts/AuthContext";

const AccountBusiness = () => {
  const auth = useAuth();
  const router = useRouter();
  const openSnackbar = useSnackbar();
  const alert = useAlert();

  const { data: dataMeta } = useSWR(businessUrl.meta, (url) =>
    fetch(url)
      .then((resp) => resp.json())
      .then((resp) => resp.data)
  );

  const table = useTable({
    service: getBusinessProfile,
    selector: (resp) => resp.data,
    total: (resp) => resp.total ?? 0,
    pagination: {
      startPage: 0,
    },
    replaceUrl: true,
  });

  const onClickDelete = React.useCallback(
    (id: number) => () => {
      alert.set({
        open: true,
        title: "Hapus Profil Bisnis",
        message:
          "Tindakan ini akan menghapus data secara permanen. Anda yakin ingin melanjutkan?",
        type: "warning",
        confirm: {
          onClick: () => {
            alert.set({ loading: true });
            deleteAccountBusinessProfile({ params: { id } })
              .then((resp) => {
                if (!resp.ok) {
                  throw resp;
                }
                openSnackbar("Profil Bisnis berhasil dihapuskan.");
                alert.reset();
                const timer = setTimeout(() => {
                  table.reload();
                  clearTimeout(timer);
                }, 1000);
              })
              .catch((e) => {})
              .finally(() => {
                alert.set({ loading: false });
              });
          },
        },
      });
    },
    [table.data]
  );

  const onClickUpdate = React.useCallback(
    (id: number) => () => {
      router.push(`business-profile/${id}/update`);
    },
    [table.data]
  );

  return (
    <PageTemplate
      title="Profil Bisnis"
      onCreate={
        ["user"].includes(auth.role)
          ? () => router.push("business-profile/create")
          : undefined
      }
      onReload={table.reload}
    >
      <Stack direction={"column"}>
        <RoleComponent
          role={auth.role}
          permission={["admin", "operator"]}
          then={
            <Stack
              direction={"row"}
              py={0.5}
              px={2}
              sx={{ borderBottom: 1, borderColor: "divider" }}
            >
              <div>
                <Button
                  variant={
                    table.query("status") === "pending" ? "contained" : "text"
                  }
                  size="small"
                  disableElevation
                  onClick={() => {
                    if (table.has("status")) {
                      table.setQuery({ status: undefined });
                    } else {
                      table.setQuery({ status: "pending" });
                    }
                  }}
                >
                  Menunggu Persetujuan (
                  <Box component={"span"} sx={{ fontWeight: 600 }}>
                    {dataMeta?.totalPending ?? 0}
                  </Box>
                  )
                </Button>
              </div>
            </Stack>
          }
        />
        <DataTablePage
          data={table.data}
          loading={table.loading}
          tableProps={{ size: "small" }}
          column={[
            {
              label: "No",
              value: (_, i) => table.pagination.from + (i ?? 0),
              head: { padding: "checkbox", align: "center" },
              align: "center",
            },
            {
              label: "Foto",
              value: (value) => (
                <Avatar
                  alt={value.businessName}
                  src={value.imageUrl}
                  variant="rounded"
                  sx={{ width: 32, height: 32 }}
                />
              ),
              head: { padding: "checkbox", align: "center" },
              align: "center",
            },
            {
              label: "Nama Bisnis",
              value: (value) => (
                <Link href={`business-profile/${value.id}`} underline="none">
                  {value.businessName}
                </Link>
              ),
              filter: {
                type: "text",
                value: table.query("name", ""),
                onChange: (e) => table.setQuery({ name: e.target.value }),
              },
            },
            {
              label: "Layanan",
              value: (value) => value.totalService,
              head: { align: "center" },
              align: "center",
            },
            {
              label: "Status",
              value: (value) => <StatusChip status={value.status} />,
              head: { align: "center" },
              align: "center",
              filter: {
                type: "select",
                items: [
                  { primary: "Aktif", value: "active" },
                  { primary: "Tidak Akif", value: "inactive" },
                  { primary: "Menunggu", value: "pending" },
                ],
                value: table.query("status", ""),
                onChange: (e) =>
                  table.setQuery({
                    status: e.target.value === "00" ? "" : e.target.value,
                  }),
              },
              width: "15%",
            },
            {
              label: "",
              value: (val, i) => {
                let menu: DropdownProps["menu"] = [
                  {
                    text: "Ubah",
                    onClick: onClickUpdate(val.id),
                  },
                  {
                    text: "Hapus",
                    onClick: onClickDelete(val.id),
                  },
                ];

                if (auth.role && ["admin", "operator"].includes(auth.role)) {
                  delete menu[0];
                }

                return <Dropdown menu={menu} />;
              },
              head: { padding: "checkbox", align: "center" },
              align: "center",
            },
          ]}
          pagination={getPagination(table.pagination)}
        />
      </Stack>
    </PageTemplate>
  );
};

export default AccountBusiness;
