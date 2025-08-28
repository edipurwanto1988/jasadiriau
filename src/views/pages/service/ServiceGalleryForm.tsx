"use client";
import Dialog from "@/views/components/base/Dialog";
import FormHelperText from "@mui/material/FormHelperText";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import React from "react";
import Button from "@mui/material/Button";
import useDialog from "@/views/hooks/useDialog";
import useMutation from "ezhooks/lib/useMutation";
import {
  createMultiImageSchema,
  CreateMultiImageSchema,
} from "@/schema/image.schema";
import useZod from "@/views/hooks/useZod";
import Typography from "@mui/material/Typography";
import { postGalleryImage } from "@/views/services/image.service";
import { useSnackbar } from "@/views/contexts/SnackbarContext";
import { useSWRConfig } from "swr";
import { serviceUrl } from "@/views/services/service.service";

const ServiceGalleryForm = ({ id }: { id: number }) => {
  const openSnackbar = useSnackbar();
  const { mutate } = useSWRConfig();
  const [url, setUrl] = React.useState<string[]>([]);

  const dialog = useDialog({
    onClose: () => {
      setUrl([]);
      mutation.reset();
      validation.clear();
    },
  });

  const mutation = useMutation<CreateMultiImageSchema>({
    defaultValue: {
      entityType: "gallery_service",
      entityId: id,
      files: [],
    },
  });

  const validation = useZod({
    data: mutation.data(),
    schema: createMultiImageSchema,
  });

  const onSubmit = () => {
    const validated = validation.validated();
    if (validated) {
      mutation.send({
        service: postGalleryImage,
        onSuccess: () => {
          openSnackbar("Gambar berhasil ditambahkan.");
          mutate(`${serviceUrl.serviceAccount}/${id}`);
          dialog.closeDialog()
        },
      });
    }
  };

  return (
    <Box sx={{ py: 2 }}>
      <Button
        variant="contained"
        size="small"
        disableElevation
        onClick={dialog.openDialog}
      >
        Tambah Gambar
      </Button>
      <Dialog
        open={dialog.open}
        draggable
        title={"Galleri"}
        fullWidth
        maxWidth="xs"
        actionButton={[
          { text: "Batal", onClick: dialog.closeDialog },
          {
            loading: mutation.loading,
            text: "Tambah Gambar",
            variant:"text",
            onClick: onSubmit,
          },
        ]}
      >
        <Stack direction={"column"} spacing={2}>
          <Box>
            <input
              name="file[]"
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => {
                const files = e.target.files;
                if (files?.length) {
                  mutation.setData({ files: Array.from(files) });
                  for (const file of files) {
                    const url = URL.createObjectURL(file);
                    setUrl((p) => [...p, url]);
                  }
                }

                (e.target.value as any) = null;
              }}
            />
            <FormHelperText error={validation.error("file")}>
              {validation.message("file")}
            </FormHelperText>
          </Box>

          <Box>
            <Typography variant="body2">Total Gambar: {url.length}</Typography>{" "}
          </Box>
        </Stack>
      </Dialog>
    </Box>
  );
};

export default ServiceGalleryForm;
