import Dialog from "@/views/components/base/Dialog";
import LoadComponent from "@/views/components/base/LoadComponent/LoadComponent";
import { UseDialog } from "@/views/hooks/useDialog";
import { CreateCategorySchema } from "@/schema/category.schema";
import { UseMutation } from "ezhooks/lib/useMutation";
import React from "react";
import { isEqual } from "lodash";
import { UseZod } from "@/views/hooks/useZod";
import { uniqueImage } from "@/utils/format";
import InputField from "@/views/components/base/Input/InputField";
import Collapse from "@mui/material/Collapse";
import Stack from "@mui/material/Stack";
import Image from "next/image";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";

const TextField = LoadComponent(() => import("@mui/material/TextField"));

type Props = {
  dialog: UseDialog;
  mutation: UseMutation<CreateCategorySchema>;
  validation: UseZod<CreateCategorySchema>;
  onSubmit: () => void;
};

const CategoryForm = ({ dialog, mutation, validation, onSubmit }: Props) => {
  const { setData, value } = mutation;

  const setImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const file = e.target.files[0];
      const [_, ext] = file.type.split("/");
      const filename = uniqueImage(ext);
      const newFile = new File([file], filename, {
        type: file.type,
      });

      mutation.setData({ file: newFile });
    }

    (e.target.value as any) = null;
  };
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

      <InputField
        label="Gambar"
        type="file"
        placeholder="Masukkan caption"
        fullWidth
        onChange={setImage}
        error={validation.error("file")}
        helperText={validation.message("file")}
      />

      <Collapse in={mutation.has("file")} unmountOnExit>
        <Stack direction={"column"} spacing={1}>
          <div style={{ position: "relative", width: "100%", height: "250px" }}>
            <Image
              src={
                mutation.has("file")
                  ? URL.createObjectURL(mutation.value("file"))
                  : ""
              }
              alt={mutation
                .value<string>("title", "")
                .replaceAll(" ", "_")
                .toLowerCase()}
              fill={true}
              loading="lazy"
            />
          </div>

          <div>
            <Button
              size="small"
              onClick={() => {
                mutation.singleReset("file");
              }}
              variant="text"
              fullWidth
            >
              Hapus
            </Button>
          </div>

          <Toolbar />
        </Stack>
      </Collapse>
    </Dialog>
  );
};

export default React.memo(
  CategoryForm,
  (prev, next) =>
    prev.dialog.open === next.dialog.open &&
    prev.mutation.loading === next.mutation.loading &&
    prev.mutation.processing === next.mutation.processing &&
    isEqual(prev.mutation.data(), next.mutation.data()) &&
    isEqual(prev.validation.message(), next.validation.message()) &&
    prev.validation.error() &&
    next.validation.error()
);
