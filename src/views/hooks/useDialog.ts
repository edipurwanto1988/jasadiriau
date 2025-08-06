import React from "react";

type Props = {
  onOpen?: () => void;
  onClose?: () => void;
};

export type UseDialog = {
  open: boolean;
  openDialog: () => void;
  closeDialog: () => void;
};

const useDialog = (props?: Props) => {
  const [open, _setDialog] = React.useState(false);

  const openDialog = React.useCallback(() => {
    _setDialog(true);
    if (props?.onOpen) {
      props.onOpen();
    }
  }, [open]);

  const closeDialog = React.useCallback(() => {
    _setDialog(false);
    if (props?.onClose) {
      props.onClose();
    }
  }, [open]);

  return { open, openDialog, closeDialog };
};

export default useDialog;
