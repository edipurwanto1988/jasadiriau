import Dialog from "@/views/components/base/Dialog";
import { UseDialog } from "@/views/hooks/useDialog";
import { CreateSliderSchema } from "@/schema/slider.schema";
import { UseMutation } from "ezhooks/lib/useMutation";
import { UseZod } from "@/views/hooks/useZod";
import InputSelect from "@/views/components/base/Input/InputSelect";
import InputField from "@/views/components/base/Input/InputField";
import React from "react";
import { isEqual } from "lodash";
import { uniqueImage } from "@/utils/format";
import Collapse from "@mui/material/Collapse";
import Stack from "@mui/material/Stack";
import Image from "next/image";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";

type Props = {
  dialog: UseDialog;
  mutation: UseMutation<CreateSliderSchema>;
  validation: UseZod<CreateSliderSchema>;
  onSubmit: () => void;
};

const Form = ({ dialog, mutation, validation, onSubmit }: Props) => {
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
      title={"Form Slider"}
      maxWidth="xs"
      fullWidth
      actionButton={[
        { text: "Batal", onClick: dialog.closeDialog },
        {
          text: mutation.value("id") ? "Simpan Perubahan" : "Tambah Slider",
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
        label="Caption"
        placeholder="Masukkan caption"
        fullWidth
        value={value("caption", "")}
        onChange={(e) => setData({ caption: e.target.value })}
        error={validation.error("caption")}
        helperText={validation.message("caption")}
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
        error={validation.error("status")}
        helperText={validation.message("status")}
      />

      {mutation.has("id") ? (
        <InputField
          label="Urutan"
          fullWidth
          value={value("sortOrder", "")}
          onChange={(e) =>
            setData({
              sortOrder: Number.isInteger(+e.target.value)
                ? +e.target.value
                : value("sortOrder", ""),
            })
          }
          error={validation.error("sortOrder")}
          helperText={validation.message("sortOrder")}
        />
      ) : null}

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
