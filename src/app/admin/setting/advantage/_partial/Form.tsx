import Dialog from "@/views/components/base/Dialog";
import { UseDialog } from "@/views/hooks/useDialog";
import { CreateAdvantageSchema } from "@/schema/advantage.schema";
import { UseMutation } from "ezhooks/lib/useMutation";
import { UseZod } from "@/views/hooks/useZod";
import Fade from "@mui/material/Fade";
import InputSelect from "@/views/components/base/Input/InputSelect";
import InputField from "@/views/components/base/Input/InputField";
import React from "react";
import { isEqual } from "lodash";

type Props = {
  dialog: UseDialog;
  mutation: UseMutation<CreateAdvantageSchema>;
  validation: UseZod<CreateAdvantageSchema>;
  isPending?: boolean;
  onSubmit: () => void;
};

const Form = ({ dialog, mutation, validation, isPending, onSubmit }: Props) => {
  const { setData, value } = mutation;
  return (
    <Dialog
      open={dialog.open}
      draggable
      title={"Form Adantage"}
      maxWidth="xs"
      fullWidth
      actionButton={[
        { text: "Batal", onClick: dialog.closeDialog },
        {
          text: mutation.value("id") ? "Simpan Perubahan" : "Tambah Adantage",
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
      <Fade in={mutation.loading || isPending} unmountOnExit>
        <div>
          <em>
            {mutation.loading
              ? "Mengambil data..."
              : isPending
              ? "Memuat Data"
              : ""}
          </em>
        </div>
      </Fade>

      <InputField
        label="Judul"
        placeholder="Masukkan judul"
        fullWidth
        required
        value={value("title", "")}
        onChange={(e) => setData({ title: e.target.value })}
        error={validation.error("title")}
        helperText={validation.message("title")}
      />

      <InputField
        label="Ikon"
        placeholder="Masukkan ikon"
        fullWidth
        value={value("icon", "")}
        onChange={(e) => setData({ icon: e.target.value })}
      />

      <InputField
        label="Deskripsi"
        placeholder="Masukkan deskripsi"
        fullWidth
        multiline
        rows={4}
        required
        value={value("description", "")}
        onChange={(e) => setData({ description: e.target.value })}
        error={validation.error("description")}
        helperText={validation.message("description")}
      />

      <InputSelect
        label="Status"
        items={[
          { primary: "Aktif", value: "active" },
          { primary: "Tidak Aktif", value: "inactive" },
        ]}
        value={value("status", "00")}
        onChange={(e) =>
          setData({
            status: e.target.value === "00" ? "inactive" : e.target.value,
          })
        }
      />
    </Dialog>
  );
};

export default React.memo(
  Form,
  (prev, next) =>
    prev.isPending === next.isPending &&
    prev.mutation.loading === next.mutation.loading &&
    prev.mutation.processing === next.mutation.processing &&
    isEqual(prev.mutation.data(), next.mutation.data()) &&
    isEqual(prev.dialog, next.dialog)
);
