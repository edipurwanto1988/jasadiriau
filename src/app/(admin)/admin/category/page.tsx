"use client";
import React from "react";
import PageTemplate from "@/components/templates/PageTemplate";
import DataTablePage from "@/components/base/DataTable/DataTablePage";
import Form from "./_partial/Form";
import Dropdown from "@/components/base/Dropdown/Dropdown";
import { CreateCategorySchema } from "@/schema/category.schema";
import {
  deleteCategory,
  getCategory,
  getCategoryID,
  postCategory,
} from "@/services/client/client.category";
import { getPagination } from "@/utils/table";
import useMutation from "ezhooks/lib/useMutation";
import useMultiDialog from "@/hooks/useMultiDialog";
import useTable from "ezhooks/lib/useTable";
import { useSnackbar } from "@/contexts/SnackbarContext";
import { useAlert } from "@/contexts/AlertContext";

export default function Page() {
  const openSnackbar = useSnackbar();
  const alert = useAlert();
  const dialog = useMultiDialog({
    keys: ["form", "sub"],
  });

  const [isPending, startTransition] = React.useTransition();

  const mutation = useMutation<CreateCategorySchema>({
    defaultValue: {
      name: "",
      slug: "",
    },
  });

  const table = useTable({
    service: getCategory,
    selector: (resp) => resp.data,
    total: (resp) => resp.total ?? 0,
    pagination: {
      startPage: 0,
    },
    replaceUrl: true,
  });

  const onSubmit = () => {
    mutation.send({
      service: postCategory,
      onSuccess: () => {
        table.reload();
        mutation.reset();
        openSnackbar("Kategori baru berhasil ditambahkan.");
      },
    });
  };

  const onClickDelete = React.useCallback(
    (id: number) => () => {
      alert.set({
        open: true,
        title: "Hapus Kategori",
        message:
          "Tindakan ini akan menghapus data secara permanen. Anda yakin ingin melanjutkan?",
        type: "warning",
        confirm: {
          onClick: () => {
            alert.set({ loading: true });
            mutation.send({
              service: (event) => deleteCategory({ ...event, params: { id } }),
              onSuccess: () => {
                openSnackbar("Kategori berhasil dihapuskan.");
                alert.reset();
                const timer = setTimeout(() => {
                  table.reload();
                  clearTimeout(timer);
                }, 1000);
              },
              onAlways: () => {
                alert.set({ loading: false });
              },
            });
          },
        },
      });
    },
    [table.data]
  );

  const onClickUpdate = React.useCallback(
    (id: number) => () => {
      const open = dialog.openDialog("form");
      open();

      mutation.send({
        loading: true,
        service: (event) => getCategoryID({ ...event, params: { id } }),
        onSuccess: (resp) => {
          startTransition(() => {
            mutation.setData({ ...resp.data });
          });
        },
      });
    },
    [table.data]
  );

  return (
    <PageTemplate
      title="Kategori"
      onCreate={dialog.openDialog("form")}
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
          { label: "Kategori", value: (value) => value.name },
          { label: "Slug", value: (value) => <em> {value.slug}</em> },
          {
            label: "Sub Kategori",
            value: (value) => 0,
            head: { align: "center" },
            align: "center",
          },
          {
            label: "",
            value: (val, i) => (
              <Dropdown
                menu={[
                  { text: "Ubah", onClick: onClickUpdate(val.id) },
                  { text: "Tambah Sub Kategori" },
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

      <Form
        isPending={isPending}
        dialog={dialog.getDialog("form")}
        mutation={mutation}
        onSubmit={onSubmit}
      />
    </PageTemplate>
  );
}
