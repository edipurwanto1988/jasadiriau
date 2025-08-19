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
  deleteBusinessProfile,
  getBusinessMeta,
  getBusinessProfile,
} from "@/views/services/business-profile.service";
import { statusActiveLabel } from "@/utils/string";
import { useRouter } from "next/navigation";
import { ccFormat } from "@/utils/format";
import Link from "next/link";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import useRequest from "ezhooks/lib/useRequest";

export default function Page() {
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

  const client = useRequest({
    data: {
      totalPending: 0,
    },
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
            deleteBusinessProfile({ params: { id } })
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

  React.useEffect(() => {
    client.exec({
      service: getBusinessMeta,
      onSuccess: (resp) => {
        return resp.data;
      },
    });
    return () => {
      client.cancel();
    };
  }, []);

  return (
    <PageTemplate
      title="Profil Bisnis"
      onCreate={() => router.push("business-profile/create")}
      onReload={table.reload}
    >
      <Stack direction={"column"}>
        <Stack
          direction={"row"}
          py={0.5}
          px={2}
          sx={{ borderBottom: 1, borderColor: "divider" }}
        >
          <div>
            <Button
              variant={"text"}
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
                {client.data.totalPending}
              </Box>
              )
            </Button>
          </div>
        </Stack>
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
              label: "Nama Bisnis",
              value: (value) => (
                <Link href={`business-profile/${value.id}`}>
                  {value.businessName}
                </Link>
              ),
            },
            { label: "Nama Pemilik", value: (value) => value.user?.name },
            {
              label: "Nomor Kontak",
              value: (value) => ccFormat(value.user?.phoneNumber),
            },
            {
              label: "Layanan",
              value: (_, i) => 0,
              head: { align: "center" },
              align: "center",
            },
            {
              label: "Status",
              value: (value) => statusActiveLabel(value.status),
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
      </Stack>
    </PageTemplate>
  );
}
