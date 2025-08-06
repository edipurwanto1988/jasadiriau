"use client";
import React from "react";
import { default as MUISnackbar, SnackbarProps } from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import Alert, { AlertProps } from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";
import Slide, { SlideProps } from "@mui/material/Slide";
import { useApp } from "@/views/contexts/AppContext";
import { useSnackbarConfig } from "@/views/contexts/SnackbarContext";

export interface SnackbarMessage {
  message: React.ReactNode;
  key: number;
}
export type SnackProps = {
  severity?: AlertProps["severity"];
  variant?: AlertProps["variant"];
  snackPack?: SnackbarMessage[];
} & Omit<SnackbarProps, "open" | "message">;

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="left" />;
}

function SlideUpTransition(props: SlideProps) {
  return <Slide {...props} direction="up" />;
}

const Snackbar = () => {
  const {
    snackbar: { severity, variant, snackPack, ...props },
  } = useSnackbarConfig();
  const { isMobile } = useApp();

  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState<SnackbarMessage | undefined>(
    undefined
  );

  const handleClose = (_: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleExited = () => {
    setMessage(undefined);
  };

  React.useEffect(() => {
    if (snackPack && snackPack.length && !message) {
      // Set a new snack when we don't have an active one
      const find = snackPack.pop();
      if (find) {
        setMessage({ ...find });
        setOpen(true);
      }
    } else if (snackPack && snackPack.length && message && open) {
      // Close an active snack when a new one is added
      setOpen(false);
    }
  }, [snackPack, message, open]);

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <MUISnackbar
      autoHideDuration={2000}
      onClose={handleClose}
      action={action}
      anchorOrigin={{
        vertical: isMobile ? "bottom" : "top",
        horizontal: isMobile ? "center" : "right",
      }}
      TransitionProps={{ onExited: handleExited }}
      TransitionComponent={isMobile ? SlideUpTransition : SlideTransition}
      open={open}
      {...props}
    >
      <Alert
        onClose={handleClose}
        severity={severity}
        variant={variant}
        sx={{ width: "100%" }}
      >
        {message?.message || ""}
      </Alert>
    </MUISnackbar>
  );
};

export default Snackbar;
