import ButtonFile, { ButtonFileProps } from "./ButtonFile";
import { lazy, Suspense } from "react";
import Box, { BoxProps } from "@mui/material/Box";
import imageUpload from "@assets/images/image-upload.png";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";

const Close = lazy(() => import("@mui/icons-material/Close"));
const FileUploadOutlined = lazy(
  () => import("@mui/icons-material/FileUploadOutlined")
);
const ZoomIn = lazy(() => import("@mui/icons-material/ZoomIn"));

export interface InputFileBoxProps {
  src?: string;
  defaultSrc?: string;
  buttons: {
    upload?: ButtonFileProps;
    view?: IconButtonProps;
    remove?: IconButtonProps;
  };
  sx?: BoxProps["sx"];
}

const InputFileBox = ({ defaultSrc, src, buttons, sx }: InputFileBoxProps) => {
  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        border: (theme) => `1px solid ${theme.palette.divider}`,
        ...sx,
      }}
      onMouseOver={(event) => {
        (event.currentTarget.lastElementChild as HTMLElement).style.bottom =
          "0";
      }}
      onMouseOut={(event) => {
        (event.currentTarget.lastElementChild as HTMLElement).style.bottom =
          "-100%";
      }}
    >
      {src ? (
        <img
          src={src}
          alt=""
          loading="lazy"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />
      ) : defaultSrc ? (
        <img
          src={defaultSrc}
          alt=""
          loading="lazy"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />
      ) : (
        <img
          src={imageUpload}
          alt=""
          loading="lazy"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />
      )}
      <div
        className="boxz"
        style={{
          position: "absolute",
          background: "#00000073",
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          bottom: "-100%",
          transition: "bottom .25s",
        }}
      >
        {buttons.upload && (
          <ButtonFile
            title={"Unggah"}
            wrapper={{ sx: { width: "28px" } }}
            {...buttons.upload}
          >
            <Suspense fallback="loading">
              <FileUploadOutlined
                sx={{
                  display: "block",
                  margin: "auto",
                  cursor: "pointer",
                  color: "#fff",
                }}
                fontSize="inherit"
              />
            </Suspense>
          </ButtonFile>
        )}

        {buttons.view && (
          <IconButton size="small" {...buttons.view}>
            <Suspense fallback="loading">
              <ZoomIn fontSize="inherit" sx={{ color: "#fff" }} />
            </Suspense>
          </IconButton>
        )}

        {buttons.remove && (
          <IconButton size="small" {...buttons.remove}>
            {" "}
            <Suspense fallback="loading">
              <Close fontSize="inherit" sx={{ color: "#fff" }} />
            </Suspense>{" "}
          </IconButton>
        )}
      </div>
    </Box>
  );
};

export default InputFileBox;
