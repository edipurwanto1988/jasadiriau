"use client";
import React from "react";
import DataTablePage from "@/views/components/base/DataTable/DataTablePage";
import Dropdown from "@/views/components/base/Dropdown/Dropdown";
import PageTemplate from "@/views/components/templates/PageTemplate";
import useTable from "ezhooks/lib/useTable";
import { getPagination } from "@/utils/table";
import { useSnackbar } from "@/views/contexts/SnackbarContext";
import { useAlert } from "@/views/contexts/AlertContext";
import {
  deleteAccountBusinessProfile,
  getBusinessProfile,
} from "@/views/services/business-profile.service";
import { statusActiveLabel } from "@/utils/string";
import { useRouter } from "next/navigation";
import Avatar from "@mui/material/Avatar";
import Link from "@mui/material/Link";
import { Metadata } from "next";
import StatusChip from "@/views/components/base/Chip/StatusChip";

const AccountBusiness = () => {
  const router = useRouter();
  const openSnackbar = useSnackbar();
  const alert = useAlert();

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
      onCreate={() => router.push("business-profile/create")}
      onReload={table.reload}
    >
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
          },
          {
            label: "Layanan",
            value: (_, i) => 0,
            head: { align: "center" },
            align: "center",
          },
          {
            label: "Status",
            value: (value) => <StatusChip status={value.status} />,
            head: { align: "center" },
            align: "center",
          },
          {
            label: "",
            value: (val, i) => (
              <Dropdown
                menu={[
                  { text: "Ubah", onClick: onClickUpdate(val.id) },
                  { text: "Hapus", onClick: onClickDelete(val.id) },
                ]}
              />
            ),
            head: { padding: "checkbox", align: "center" },
            align: "center",
          },
        ]}
        pagination={getPagination(table.pagination)}
      />
    </PageTemplate>
  );
};

export default AccountBusiness;
