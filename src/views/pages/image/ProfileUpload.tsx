"use client";
import React from "react";
import Dialog from "@/views/components/base/Dialog";
import Cropper from "react-easy-crop";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { getCroppedImg } from "@/utils/image";
import { UseDialog } from "@/views/hooks/useDialog";

type Props = {
  dialog: UseDialog;
  onSave?: (result: string | Blob | null, close: () => void) => void;
};

const ProfileUpload = ({ dialog, onSave }: Props) => {
  const [url, setUrl] = React.useState(
    `${process.env.NEXT_PUBLIC_BASE_URL}/images/placeholder.webp`
  );
  const [crop, setCrop] = React.useState({ x: 0, y: 0 });
  const [rotation, setRotation] = React.useState(0);
  const [zoom, setZoom] = React.useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = React.useState(null);

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const showCroppedImage = async () => {
    try {
      const croppedImage = await getCroppedImg(url, croppedAreaPixels, {
        rotation,
        asBlob: true,
        format: "image/webp",
        quality: 1,
      });
      return croppedImage;
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  const reset = () => {
    setUrl(`${process.env.NEXT_PUBLIC_BASE_URL}/images/placeholder.webp`);
  };

  const onClick = async () => {
    if (onSave) {
      const result = await showCroppedImage();
      onSave(result, dialog.closeDialog);
    } else {
      dialog.closeDialog();
    }
    reset();
  };

  return (
    <Dialog
      title={"Unggah Profil"}
      fullWidth
      draggable
      open={dialog.open}
      maxWidth="xs"
      actionButton={[
        { text: "Batal", onClick: dialog.closeDialog },
        {
          text: "Simpan Gambar",
          onClick: onClick,
        },
      ]}
    >
      <Stack direction={"column"} spacing={3}>
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: 250,
          }}
        >
          <Cropper
            image={url}
            crop={crop}
            rotation={rotation}
            zoom={zoom}
            aspect={4 / 3}
            onCropChange={setCrop}
            onRotationChange={setRotation}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </Box>

        <input
          name="file"
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              const url = URL.createObjectURL(file);
              setUrl(url);
            }

            (e.target.value as any) = null;
          }}
        />

        <Stack direction={"column"} spacing={2}>
          <Stack direction={"row"} alignItems={"center"} spacing={3}>
            <Box flexBasis={"10%"}>
              <Typography>Zoom</Typography>
            </Box>

            <Slider
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              aria-labelledby="Zoom"
              onChange={(e, zoom) => setZoom(zoom)}
            />
          </Stack>

          <Stack direction={"row"} alignItems={"center"} spacing={3}>
            <Box flexBasis={"10%"}>
              <Typography>Rotate</Typography>
            </Box>

            <Slider
              value={rotation}
              min={0}
              max={360}
              step={1}
              aria-labelledby="Rotation"
              onChange={(e, rotation) => setRotation(rotation)}
            />
          </Stack>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default ProfileUpload;
