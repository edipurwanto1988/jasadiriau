"use client";

import React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Image from "next/image";
import Stack from "@mui/material/Stack";
import Fade from "@mui/material/Fade";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import LoadComponent from "@/views/components/base/LoadComponent/LoadComponent";
import useDialog from "@/views/hooks/useDialog";
import ImageView from "@/views/components/base/Image/ImageView";
import { useAlert } from "@/views/contexts/AlertContext";
import { useSnackbar } from "@/views/contexts/SnackbarContext";
import { imageUrl } from "@/views/services/image.service";

const DeleteIcon = LoadComponent(
  () => import("@mui/icons-material/DeleteOutline")
);

type Props = {
  loading?: boolean;
  url: { id: number; imageUrl: string }[];
};
const temp = `${process.env.NEXT_PUBLIC_BASE_URL}/images/placeholder.webp`;

const ServiceGallery = ({ url, loading }: Props) => {
  const alert = useAlert();
  const openSnackbar = useSnackbar();
  const [image, setImage] = React.useState(temp);
  const [gallery, setGallery] = React.useState(url);

  const dialog = useDialog({
    onClose: () => {
      setImage(temp);
    },
  });

  const onClickDelete = (val: number) => () => {
    alert.set({
      open: true,
      title: "Hapus Gambar",
      message:
        "Tindakan ini akan menghapus data secara permanen. Anda yakin ingin melanjutkan?",
      type: "warning",
      confirm: {
        onClick: () => {
          alert.set({ loading: true });
          fetch(`${imageUrl.gallery}/${val}`, { method: "delete" })
            .then((resp) => {
              if (!resp.ok) {
                throw resp;
              }
              openSnackbar("Gambar berhasil dihapuskan.");
              setGallery((p) => {
                return [...p.filter((p) => p.id !== val)];
              });
              alert.reset();
              return resp;
            })
            .catch((e) => {})
            .finally(() => {
              alert.set({ loading: false });
            });
        },
      },
    });
  };

  return (
    <Stack
      direction={"column"}
      spacing={2}
      sx={{
        "& > :not(style) ~ :not(style)": {
          marginTop: 0,
        },
      }}
    >
      <Fade in={loading} unmountOnExit>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Skeleton variant="rounded" width={128} height={64} />
          <Skeleton variant="rounded" width={128} height={64} />
          <Skeleton variant="rounded" width={128} height={64} />
          <Skeleton variant="rounded" width={128} height={64} />
        </Stack>
      </Fade>

      {gallery.length ? (
        <ImageList
          sx={{ width: "100%", height: "auto" }}
          cols={5}
          rowHeight={164}
        >
          {gallery.map((item, i) => (
            <ImageListItem key={i} sx={{ position: "relative" }}>
              <Image
                src={item.imageUrl}
                alt={`gambar-${i}`}
                sizes={"100%"}
                fill
                priority
                onClick={() => {
                  setImage(item.imageUrl);
                  dialog.openDialog();
                }}
              />
              <ImageListItemBar
                title={`Gambar ${i + 1}`}
                actionIcon={
                  <IconButton
                    onClick={onClickDelete(item.id)}
                    sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                  >
                    <DeleteIcon htmlColor="white" />
                  </IconButton>
                }
              />
            </ImageListItem>
          ))}
        </ImageList>
      ) : (
        <Typography>Gambar Belum Tersedia.</Typography>
      )}

      <ImageView open={dialog.open} url={image} onClose={dialog.closeDialog} />
    </Stack>
  );
};

export default ServiceGallery;
