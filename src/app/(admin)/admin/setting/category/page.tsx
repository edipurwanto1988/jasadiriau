"use client";
import React from "react";
import DataTablePage from "@/views/components/base/DataTable/DataTablePage";
import Form from "./_partial/Form";
import Dropdown from "@/views/components/base/Dropdown/Dropdown";
import {
  CreateCategorySchema,
  createCatgorySchema,
  updateCategorySchema,
} from "@/schema/category.schema";
import {
  deleteCategory,
  getCategory,
  getCategoryID,
  postCategory,
} from "@/views/services/category.service";
import { getPagination } from "@/utils/table";
import useMutation from "ezhooks/lib/useMutation";
import useMultiDialog from "@/views/hooks/useMultiDialog";
import useTable from "ezhooks/lib/useTable";
import { useSnackbar } from "@/views/contexts/SnackbarContext";
import { useAlert } from "@/views/contexts/AlertContext";
import SettingTemplate from "@/views/components/templates/SettingTemplate";
import useZod from "@/views/hooks/useZod";
import { parseResponseError } from "@/utils/format";
import SnacbarLoading from "@/views/components/base/Skeleton/SnacbarLoading";

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

  const validation = useZod({
    data: mutation.data(),
    schema: createCatgorySchema,
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
    const isNewRecord = !mutation.has("id");
    const validated = validation.validated({
      schema: !isNewRecord ? updateCategorySchema : undefined,
    });

    if (validated) {
      mutation.send({
        service: postCategory,
        onSuccess: () => {
          table.reload();
          mutation.reset();
          openSnackbar(
            isNewRecord
              ? "Kategori baru berhasil ditambahkan."
              : "Kategori berhasil diperbaharui"
          );
        },
        onError: (e) => {
          parseResponseError(e, (msg) => {
            openSnackbar(msg, { severity: "error" });
          });
        },
      });
    }
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
    <SettingTemplate
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
        dialog={dialog.getDialog("form")}
        mutation={mutation}
        validation={validation}
        onSubmit={onSubmit}
      />

      <SnacbarLoading loading={mutation.loading} pending={isPending} />
    </SettingTemplate>
  );
}
