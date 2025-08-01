import { Suspense, lazy, memo } from "react";
import Backdrop from "@mui/material/Backdrop";
import IconButton from "@mui/material/IconButton";

const HighlightOff = lazy(() => import("@mui/icons-material/HighlightOff"));

export interface ImageViewProps {
  open: boolean;
  url?: string;
  onClose: () => void;
}

const ImageView = ({ open, url, onClose }: ImageViewProps) => {
  return (
    <Backdrop
      open={open}
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 9999 }}
      onClick={onClose}
    >
      <div style={{ position: "relative", maxWidth: "95%", height: "90%" }}>
        <img
          src={url}
          alt=""
          style={{
            maxWidth: "100%",
            height: "100%",
            display: "block",
            marginRight: "auto",
            marginLeft: "auto",
          }}
        />

        <IconButton
          size="small"
          sx={{
            position: "absolute",
            top: -40,
            right: -40,
            color: "white",
          }}
        >
          <Suspense fallback="loading">
            <HighlightOff fontSize="large" />
          </Suspense>
        </IconButton>
      </div>
    </Backdrop>
  );
};

export default memo(ImageView, (prev, next) => prev.open === next.open);
