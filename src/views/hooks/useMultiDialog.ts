import React from "react";

type Props<K extends readonly string[]> = {
  keys: K;
  onOpen?: Partial<Record<K[number], () => void>>;
  onClose?: Partial<Record<K[number], () => void>>;
};

const useMultiDialog = <K extends readonly string[]>(props: Props<K>) => {
  const [open, _setDialog] = React.useState<Record<K[number], boolean>>(
    Object.fromEntries(props.keys.map((v) => [v, false])) as Record<K[number], boolean>
  );

  const openDialog = React.useCallback(
    (key: K[number]) => () => {
      _setDialog((p) => ({ ...p, [key]: true }));
      props.onOpen?.[key]?.();
    },
    [props.onOpen]
  );

  const closeDialog = React.useCallback(
    (key: K[number]) => () => {
      _setDialog((p) => ({ ...p, [key]: false }));
      props.onClose?.[key]?.();
    },
    [props.onClose]
  );

  const getDialog = (key: K[number]) => ({
    open: open[key],
    openDialog: openDialog(key),
    closeDialog: closeDialog(key),
  });

  return {
    open,
    openDialog,
    closeDialog,
    getDialog,
  };
};

export default useMultiDialog;
