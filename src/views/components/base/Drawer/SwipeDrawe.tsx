import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import SwipeableDrawer, {
  SwipeableDrawerProps,
} from "@mui/material/SwipeableDrawer";
import React from "react";

type SwipeDrawerProps = SwipeableDrawerProps & { maxHeight?: number };

const Puller = styled("div")(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.grey[300],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
}));

const SwipeDrawer = ({ maxHeight, ...props }: SwipeDrawerProps) => {
  const ref = React.useRef<null | HTMLDivElement>(null);
  const drawerHeight = React.useRef(maxHeight || 200);
  const startY = React.useRef(null);
  const calculatedMaxHeight = React.useRef(
    maxHeight || window.innerHeight - 56
  );

  React.useEffect(() => {
    const handleResize = () => {
      calculatedMaxHeight.current = maxHeight || window.innerHeight - 56;
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [maxHeight]);

  const handleTouchStart = (event) => {
    startY.current = event.touches[0].clientY;
  };

  const handleTouchMove = (event) => {
    if (startY.current !== null) {
      const currentY = event.touches[0].clientY;
      const deltaY = startY.current - currentY;
      const newHeight = Math.min(
        calculatedMaxHeight.current,
        Math.max(200, drawerHeight.current + deltaY)
      );
      if (ref.current) {
        ref.current.style.height = `${newHeight}px`;
      }
    }
  };

  const handleTouchEnd = () => {
    if (startY.current !== null) {
      const currentY = ref.current?.style.height.replace("px", "");
      drawerHeight.current = parseInt(currentY, 10);
      startY.current = null;
    }
  };

  const iOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);

  return (
    <SwipeableDrawer
      anchor="bottom"
      disableBackdropTransition={!iOS}
      disableDiscovery={iOS}
      disableSwipeToOpen={false}
      allowSwipeInChildren
      PaperProps={{
        ref: ref,
        style: {
          height: `${drawerHeight.current}px`,
          transition: "height 0.2s ease-out",
        },
        sx: {
          borderStartEndRadius: 8,
          borderStartStartRadius: 8,
        },
      }}
      {...props}
      onClose={(event) => {
        drawerHeight.current = 200;
        props.onClose(event);
      }}
    >
      <Box
        overflow={"hidden"}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <Puller />
        {props.children}
      </Box>
    </SwipeableDrawer>
  );
};

export default SwipeDrawer;
