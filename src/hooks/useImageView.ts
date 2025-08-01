import { useState } from "react";

type UseImageViewProps = {
  defaultImage?: string;
};

export interface UseImageView {
  open: boolean;
  view?: string;
  onOpen: () => void;
  onClose: () => void;
  setFile: (file: File, open?: boolean) => void;
  setUrl: (url: string, open?: boolean) => void;
  reset: () => void;
}

const useImageView = (props?: UseImageViewProps): UseImageView => {
  const [conditional, setCondtional] = useState({
    open: false,
    default: (props && props.defaultImage) || undefined,
    view: undefined,
  });

  const onOpen = () => {
    setCondtional((state) => ({
      ...state,
      open: !state.open,
    }));
  };

  const onClose = () => {
    setCondtional({
      view: undefined,
      open: false,
      default: (props && props.defaultImage) || undefined,
    });
  };

  const setFile = (file: File, open?: boolean) => {
    setCondtional((state) => ({
      ...state,
      view: URL.createObjectURL(file),
      open: open || state.open,
    }));
  };

  const setUrl = (url: string, open?: boolean) => {
    setCondtional((state) => ({
      ...state,
      view: url,
      open: open || state.open,
    }));
  };

  const reset = () => {
    setCondtional({
      view: undefined,
      open: false,
      default: (props && props.defaultImage) || undefined,
    });
  };

  return {
    open: conditional.open,
    view: conditional.view,
    onOpen,
    onClose,
    setFile,
    setUrl,
    reset,
  };
};

export default useImageView;
