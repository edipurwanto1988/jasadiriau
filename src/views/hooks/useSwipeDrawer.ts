import React from "react";

type Props = {
  onOpen?: () => void;
  onClose?: () => void;
};

export type UseSwipeDrawer = {
  open: boolean;
  openDrawer: (val: boolean) => void;
  closeDrawer: () => void;
};

const useSwipeDrawer = (props?: Props) => {
  const [open, _setDrawer] = React.useState(false);

  const openDrawer = React.useCallback(() => {
    _setDrawer(true);
    if (props?.onOpen) {
      props.onOpen();
    }
  }, [open]);

  const closeDrawer = React.useCallback(() => {
    _setDrawer(false);
    if (props?.onClose) {
      props.onClose();
    }
  }, [open]);

  return { open, openDrawer, closeDrawer };
};

export default useSwipeDrawer;
