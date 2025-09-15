"use client";
import React from "react";
import DataTablePage from "@/views/components/base/DataTable/DataTablePage";
import Dropdown from "@/views/components/base/Dropdown/Dropdown";
import SettingTemplate from "@/views/components/templates/SettingTemplate";
import { getPagination } from "@/utils/table";
import useMutation from "ezhooks/lib/useMutation";
import useTable from "ezhooks/lib/useTable";
import { useSnackbar } from "@/views/contexts/SnackbarContext";
import { useAlert } from "@/views/contexts/AlertContext";
import useDialog from "@/views/hooks/useDialog";
import { createAdvantageSchema } from "@/schema/advantage.schema";
import useZod from "@/views/hooks/useZod";
import {
  deleteAdvantage,
  getAdvantage,
  getAdvantageID,
  patchStatusAdvantage,
  postAdvantage,
} from "@/views/services/advantage.service";
import { statusActiveLabel } from "@/utils/string";
import SnacbarLoading from "@/views/components/base/Skeleton/SnacbarLoading";
import AdvantageForm from "./AdvantageForm";
import Switch from "@mui/material/Switch";

const AdvantageList = () => {
  const openSnackbar = useSnackbar();
  const alert = useAlert();
  const dialog = useDialog({
    onClose: () => {
      mutation.reset();
      validation.clear();
    },
  });

  const [isPending, startTransition] = React.useTransition();

  const mutation = useMutation({
    defaultValue: {
      title: "",
      description: "",
      status: "inactive",
    },
  });

  const validation = useZod({
    data: mutation.data(),
    schema: createAdvantageSchema,
  });

  const table = useTable({
    service: getAdvantage,
    selector: (resp) => resp.data,
    total: (resp) => resp.total ?? 0,
    pagination: {
      startPage: 0,
    },
    replaceUrl: true,
  });

  const onSubmit = () => {
    const isNewRecord = !!!mutation.value("id", 0);
    const validated = validation.validated();
    if (validated) {
      mutation.send({
        service: postAdvantage,
        onSuccess: () => {
          table.reload();
          mutation.reset();
          dialog.closeDialog();
          openSnackbar(
            isNewRecord
              ? "Advantage baru berhasil ditambahkan."
              : "Advantage berhasil diperbaharui."
          );
        },
      });
    }
  };

  const onClickDelete = React.useCallback(
    (id: number) => () => {
      alert.set({
        open: true,
        title: "Hapus Advantage",
        message:
          "Tindakan ini akan menghapus data secara permanen. Anda yakin ingin melanjutkan?",
        type: "warning",
        confirm: {
          onClick: () => {
            alert.set({ loading: true });
            mutation.send({
              service: (event) => deleteAdvantage({ ...event, params: { id } }),
              onSuccess: () => {
                openSnackbar("Advantage berhasil dihapuskan.");
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
      dialog.openDialog();
      mutation.send({
        loading: true,
        service: (event) => getAdvantageID({ ...event, params: { id } }),
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
      title="Advantage"
      onCreate={dialog.openDialog}
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
          { label: "Judul", value: (value) => value.title },
          {
            label: "Deskripsi",
            value: (value) => value.description.substring(0, 50),
          },
          // {
          //   label: "Ikon",
          //   value: (value) => value.icon,
          //   head: { align: "center" },
          //   align: "center",
          // },
          {
            label: "Status",
            value: (value) => (
              <Switch
                size="small"
                checked={value.status === "active"}
                color={value.status === "active" ? "success" : "default"}
                onChange={(e, checked) => {
                  mutation.send({
                    params: { id: value.id },
                    service: patchStatusAdvantage,
                    onSuccess: () => {
                      table.update((data) => data.id === value.id, {
                        ...value,
                        status: checked ? "active" : "inactive",
                      });
                    },
                    onError: (e) => {
                      openSnackbar('Status gagal diberbaharui.', { severity: "error" });
                    },
                  });
                }}
              />
            ),
            head: { align: "center", padding: "checkbox" },
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

      <AdvantageForm
        dialog={dialog}
        mutation={mutation}
        validation={validation}
        onSubmit={onSubmit}
      />

      <SnacbarLoading loading={mutation.loading} pending={isPending} />
    </SettingTemplate>
  );
};

export default AdvantageList;
