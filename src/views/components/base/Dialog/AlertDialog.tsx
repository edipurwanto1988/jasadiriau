"use client";
import { useAlert } from "@/views/contexts/AlertContext";
import { default as MuiAlert } from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Dialog from "@mui/material/Dialog";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Zoom from "@mui/material/Zoom";
import { forwardRef, lazy, Suspense } from "react";
import LoadComponent from "../LoadComponent/LoadComponent";
import { TransitionProps } from "@mui/material/transitions";

const Check = lazy(() => import("@mui/icons-material/Check"));
const Close = lazy(() => import("@mui/icons-material/Close"));

const TextField = LoadComponent(() => import("@mui/material/TextField"));

export type AlertModel = {
  open: boolean;
  title: string;
  message: string;
  type: "success" | "warning" | "info" | "error";
  loading?: boolean;
  close?: {
    icon?: any;
    text?: string;
    onClick?: () => void;
  };
  confirm?: {
    icon?: any;
    text?: string;
    onClick?: (remark?: string) => void;
  };
  fullwidth?: boolean;
  textfield?: boolean;
  remark?: string;
};

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Zoom ref={ref} {...props} />;
});

const AlertDialog = () => {
  const { alert, setRemark } = useAlert();

  return (
    <Dialog
      maxWidth="xs"
      fullWidth={alert.fullwidth}
      open={alert.open}
      slots={{
        transition: Transition,
      }}
      aria-describedby={"alert-" + alert.type}
      aria-labelledby={"alert-" + alert.type}
    >
      <MuiAlert
        severity={alert.type}
        variant="outlined"
        sx={{
          "& .MuiAlert-message": {
            flexGrow: 1,
          },
        }}
      >
        <AlertTitle>{alert.title || ""}</AlertTitle>
        <Stack direction="column" spacing={1}>
          <Typography variant="body2">{alert.message || ""}</Typography>

          {alert.textfield ? (
            <Stack direction={"column"}>
              <p>Remark:</p>
              <TextField
                variant="standard"
                multiline
                placeholder="Enter somethings..."
                rows={4}
                value={alert.remark}
                onChange={(e) => setRemark(e.target.value)}
              />
            </Stack>
          ) : null}

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <ButtonGroup size="small">
              {alert.close && (
                <Button
                  disabled={alert.loading}
                  startIcon={
                    alert.close?.icon || (
                      <Suspense fallback={"loading..."}>
                        <Close fontSize="inherit" />
                      </Suspense>
                    )
                  }
                  color="inherit"
                  variant="text"
                  onClick={alert.close.onClick}
                >
                  {alert.close.text || "Batalkan"}
                </Button>
              )}

              {alert.confirm && (
                <Suspense fallback="loading...">
                  <Button
                    loading={alert.loading}
                    startIcon={
                      alert.confirm?.icon || (
                        <Suspense fallback={"loading..."}>
                          <Check fontSize="inherit" />
                        </Suspense>
                      )
                    }
                    color={alert.type}
                    variant="text"
                    onClick={() => {
                      if (alert.confirm?.onClick) {
                        alert.confirm.onClick(alert.remark);
                      }
                    }}
                  >
                    {alert.confirm?.text || "Yes, confirm"}
                  </Button>
                </Suspense>
              )}
            </ButtonGroup>
          </div>
        </Stack>
      </MuiAlert>
    </Dialog>
  );
};

export default AlertDialog;
