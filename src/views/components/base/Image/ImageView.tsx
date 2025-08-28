import { Suspense, lazy, memo } from "react";
import Backdrop from "@mui/material/Backdrop";
import IconButton from "@mui/material/IconButton";
import Image from "next/image";
import Toolbar from "@mui/material/Toolbar";
import Loading from "../Skeleton/Spinner";
import Box from "@mui/material/Box";

const HighlightOff = lazy(() => import("@mui/icons-material/Close"));

export interface ImageViewProps {
  open: boolean;
  url: string;
  onClose: () => void;
}

const ImageView = ({ open, url, onClose }: ImageViewProps) => {
  return (
    <Backdrop
      open={open}
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 2, m: 0 }}
      onClick={onClose}
   
    >
      <Box
        sx={{
          position: "relative",
          height: "100%",
          width: "100%",
          px: 2,
          aspectRatio: "16/9",
          overflow: "hidden",
        }}
      >
        <Image
          src={url}
          alt={url}
          fill
          priority
          sizes="100%"
          style={{ objectFit: "contain" }}
        />

        <Toolbar
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            width: "100%",
            backgroundColor: `#000`,
            opacity: 0.2,
            height: {
              xs: 48,
            },
            minHeight: {
              xs: 48,
            },
          }}
        >
          <div>
            <IconButton size="small">
              <Suspense fallback={<Loading />}>
                <HighlightOff fontSize="large" htmlColor="white" />
              </Suspense>
            </IconButton>
          </div>
        </Toolbar>
      </Box>
    </Backdrop>
  );
};

export default memo(ImageView, (prev, next) => prev.open === next.open);
