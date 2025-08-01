'use client'
import React from "react";
import { SnackProps } from "@/components/base/Snackbar";

const SnackbarContext = React.createContext({
  snackbar: {} as SnackProps,
  openSnackbar: (_: React.ReactNode, __?: SnackProps) => {},
});

const SnackbarProvider = (props) => {
  const [snack, setSnack] = React.useState<SnackProps>({
    snackPack: [],
    severity: "success",
    variant: "filled",
  });

  const setSnackbar = React.useCallback(
    (message: React.ReactNode, options?: SnackProps) => {
      setSnack((p) => {
        const opt: SnackProps = {
          severity: "success",
          variant: "filled",
          ...options,
        };

        if (message) {
          p.snackPack = [{ message, key: new Date().getTime() }];
        }
        return { ...p, ...opt };
      });
    },
    []
  );

  const snackbar = React.useMemo(() => snack, [snack.snackPack]);

  return (
    <SnackbarContext.Provider
      value={{
        snackbar,
        openSnackbar: setSnackbar,
      }}
    >
      {props.children}
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  const context = React.useContext(SnackbarContext);
  return context.openSnackbar;
};

export const useSnackbarConfig = () => {
  const context = React.useContext(SnackbarContext);
  return context;
};

export default SnackbarProvider;
