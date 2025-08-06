import React from "react";
import {
  default as MuiDialog,
  DialogProps as MuiDialogProps,
} from "@mui/material/Dialog";
import { DialogTitleProps } from "@mui/material/DialogTitle";
import DialogContent, { DialogContentProps } from "@mui/material/DialogContent";
import DialogActions, { DialogActionsProps } from "@mui/material/DialogActions";
import Button, { ButtonProps } from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Paper, { PaperProps } from "@mui/material/Paper";
import Draggable from "react-draggable";
import { useApp } from "@/views/contexts/AppContext";

export interface DialogProps extends MuiDialogProps {
  draggable?: boolean;
  title?: any;
  hideHeader?: boolean;
  hideAction?: boolean;
  hideContent?: boolean;
  TitleProps?: DialogTitleProps;
  ContentProps?: DialogContentProps;
  actionComponent?: React.ReactNode;
  ActionProps?: DialogActionsProps;
  actionButton?: (Omit<ButtonProps, "children"> & { text?: React.ReactNode })[];
}

const ArrowBackIcon = React.lazy(() => import("@mui/icons-material/ArrowBack"));
const CloseIcon = React.lazy(() => import("@mui/icons-material/Close"));

const PaperComponent = (props: PaperProps) => {
  const nodeRef = React.useRef<HTMLDivElement>(null);
  return (
    <Draggable
      nodeRef={nodeRef as React.RefObject<HTMLDivElement>}
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} ref={nodeRef} />
    </Draggable>
  );
};

const Dialog = ({
  draggable,
  title,
  hideAction,
  hideHeader,
  hideContent,
  TitleProps,
  ContentProps,
  ActionProps,
  actionComponent,
  actionButton,
  ...props
}: DialogProps) => {
  const app = useApp();

  const renderActionButton = (buttons: DialogProps["actionButton"]) => {
    const btnLength = (buttons ?? []).length;

    return (buttons ?? []).map(({ text, ...btn }, k) => {
      let btnProps: ButtonProps = {
        children: text,
        disableElevation: true,
        size: "small",
        variant: "outlined",
      };

      if (btnLength === 1) {
        btnProps.color = "primary";
        if (!text) {
          btnProps.children = "Keluar";
        }
      } else {
        if (k === 0) {
          btnProps.color = "inherit";
          btnProps.variant = "text";
          if (!text) {
            btnProps.children = "Batal";
          }
        } else {
          btnProps.color = "primary";
        }
      }

      btnProps = { ...btnProps, ...btn };
      return <Button key={k} {...btnProps} />;
    });
  };

  const contentProps = (
    value?: DialogContentProps
  ): DialogContentProps | undefined => {
    if (!value) {
      return {};
    }
    return value;
  };

  return (
    <MuiDialog
      PaperComponent={draggable ? PaperComponent : undefined}
      {...props}
      aria-labelledby="draggable-dialog-title"
    >
      {hideHeader ? null : (
        <Toolbar
          sx={{
            display: "flex",
            flexDirection: app.isMobile ? "row-reverse" : "row",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: 1,
            py: 1,
            px: 1,
            minHeight: {
              xs: 32,
            },
            cursor: draggable ? "move" : "unset",
          }}
          id="draggable-dialog-title"
        >
          <Box
            flexGrow={1}
            pl={{
              xs: 1,
              sm: 1,
              md: 0,
              xl: 0,
              lg: 0,
            }}
          >
            <Typography variant="subtitle1">{title}</Typography>
          </Box>
          {props.onClose ? (
            <Box>
              <IconButton
                size="small"
                onClick={(evt) => {
                  if (props.onClose) {
                    props.onClose(evt, "backdropClick");
                  }
                }}
              >
                <React.Suspense fallback={"loading"}>
                  {app.isMobile ? (
                    <ArrowBackIcon fontSize="inherit" />
                  ) : (
                    <CloseIcon fontSize="inherit" />
                  )}
                </React.Suspense>
              </IconButton>
            </Box>
          ) : null}
        </Toolbar>
      )}
      {hideContent ? (
        props.children
      ) : (
        <DialogContent dividers {...contentProps(ContentProps)}>
          {props.children}
        </DialogContent>
      )}
      {hideAction ? null : (
        <DialogActions {...ActionProps}>
          {actionComponent
            ? actionComponent
            : actionButton
            ? renderActionButton(actionButton)
            : null}
        </DialogActions>
      )}
    </MuiDialog>
  );
};

export default Dialog;
