"use client";
import React from "react";
import DataTablePage from "@/views/components/base/DataTable/DataTablePage";
import Dropdown from "@/views/components/base/Dropdown/Dropdown";
import SettingTemplate from "@/views/components/templates/SettingTemplate";
import useMutation from "ezhooks/lib/useMutation";
import useTable from "ezhooks/lib/useTable";
import { useSnackbar } from "@/views/contexts/SnackbarContext";
import { useAlert } from "@/views/contexts/AlertContext";
import useDialog from "@/views/hooks/useDialog";
import { createSliderSchema, updateSliderSchema } from "@/schema/slider.schema";
import useZod from "@/views/hooks/useZod";
import {
  deleteSlider,
  getSlider,
  getSliderID,
  postSlider,
} from "@/views/services/slider.service";
import { statusActiveLabel } from "@/utils/string";
import Avatar from "@mui/material/Avatar";
import { imgUrl } from "@/lib/dummy";
import SnacbarLoading from "@/views/components/base/Skeleton/SnacbarLoading";
import SliderForm from "./SliderForm";

const SliderList = () => {
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
    schema: createSliderSchema,
  });

  const table = useTable({
    service: getSlider,
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
      schema: !isNewRecord ? updateSliderSchema : undefined,
    });

    if (validated) {
      mutation.send({
        service: postSlider,
        onSuccess: () => {
          table.reload();
          mutation.reset();
          dialog.closeDialog();
          openSnackbar(
            isNewRecord
              ? "Slider baru berhasil ditambahkan."
              : "Slider berhasil diperbaharui."
          );
        },
      });
    }
  };

  const onClickDelete = React.useCallback(
    (id: number) => () => {
      alert.set({
        open: true,
        title: "Hapus Slider",
        message:
          "Tindakan ini akan menghapus data secara permanen. Anda yakin ingin melanjutkan?",
        type: "warning",
        confirm: {
          onClick: () => {
            alert.set({ loading: true });
            mutation.send({
              service: (event) => deleteSlider({ ...event, params: { id } }),
              onSuccess: () => {
                openSnackbar("Slider berhasil dihapuskan.");
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
        service: (event) => getSliderID({ ...event, params: { id } }),
        onSuccess: (resp) => {
          startTransition(() => {
            mutation.setData({ ...resp.data, file: undefined });
          });
        },
      });
    },
    [table.data]
  );

  return (
    <SettingTemplate
      title="Slider"
      onCreate={dialog.openDialog}
      onReload={table.reload}
    >
      <DataTablePage
        data={table.data}
        loading={table.loading}
        tableProps={{ size: "small" }}
        column={[
          {
            label: "Urutan",
            value: (value) => value.sortOrder,
            head: { align: "center", padding: "checkbox" },
            align: "center",
            padding: "checkbox",
          },
          {
            label: "Gambar",
            value: (value) => (
              <Avatar
                alt={value.title}
                src={value.imageUrl || imgUrl}
                variant="square"
              />
            ),
            head: { align: "center", padding: "checkbox" },
            align: "center",
            padding: "checkbox",
          },
          { label: "Judul", value: (value) => value.title },
          {
            label: "Caption",
            value: (value) => value.caption,
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
      />

      <SliderForm
        dialog={dialog}
        mutation={mutation}
        validation={validation}
        onSubmit={onSubmit}
      />

      <SnacbarLoading loading={mutation.loading} pending={isPending} />
    </SettingTemplate>
  );
};

export default SliderList;
