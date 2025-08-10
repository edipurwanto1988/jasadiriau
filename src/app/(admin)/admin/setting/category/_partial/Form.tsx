import Dialog from "@/views/components/base/Dialog";
import LoadComponent from "@/views/components/base/LoadComponent/LoadComponent";
import { UseDialog } from "@/views/hooks/useDialog";
import { CreateCategorySchema } from "@/schema/category.schema";
import { UseMutation } from "ezhooks/lib/useMutation";
import React from "react";
import { isEqual } from "lodash";
import { UseZod } from "@/views/hooks/useZod";

const TextField = LoadComponent(() => import("@mui/material/TextField"));

type Props = {
  dialog: UseDialog;
  mutation: UseMutation<CreateCategorySchema>;
  validation: UseZod<CreateCategorySchema>;
  onSubmit: () => void;
};

const Form = ({ dialog, mutation, validation, onSubmit }: Props) => {
  const { setData, value } = mutation;
  return (
    <Dialog
      open={dialog.open}
      draggable
      title={"Form Kategori"}
      maxWidth="xs"
      fullWidth
      actionButton={[
        { text: "Batal", onClick: dialog.closeDialog },
        {
          text: mutation.has("id") ? "Simpan Kategori" : "Tambah Kategori",
          variant: "text",
          onClick: onSubmit,
        },
      ]}
      ContentProps={{
        sx: {
          display: "flex",
          flexDirection: "column",
          gap: 3,
        },
      }}
    >

      <TextField
        label="Kategori"
        placeholder="Masukkan nama kategori"
        fullWidth
        required
        value={value("name", "")}
        onChange={(e) => setData({ name: e.target.value })}
        error={validation.error("name")}
        helperText={validation.message("name")}
      />

      <TextField
        label="Slug"
        placeholder="Masukkan slug"
        fullWidth
        required
        value={value("slug", "")}
        onChange={(e) => setData({ slug: e.target.value.replaceAll(" ", "-") })}
        error={validation.error("slug")}
        helperText={validation.message("slug")}
      />
    </Dialog>
  );
};

export default React.memo(
  Form,
  (prev, next) =>
    prev.dialog.open === next.dialog.open &&
    prev.mutation.loading === next.mutation.loading &&
    prev.mutation.processing === next.mutation.processing &&
    isEqual(prev.mutation.data(), next.mutation.data()) &&
    isEqual(prev.validation.message(), next.validation.message()) &&
    prev.validation.error() &&
    next.validation.error()
);
