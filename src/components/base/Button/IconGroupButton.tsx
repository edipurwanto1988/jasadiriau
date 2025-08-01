import React from "react";
import Stack from "@mui/material/Stack";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";

const AddIcon = React.lazy(() => import("@mui/icons-material/Add"));
const EditOutlinedIcon = React.lazy(
  () => import("@mui/icons-material/EditOutlined")
);
const RefreshIcon = React.lazy(() => import("@mui/icons-material/Refresh"));
const Delete = React.lazy(() => import("@mui/icons-material/DeleteOutline"));
const DescriptionOutlinedIcon = React.lazy(
  () => import("@mui/icons-material/DescriptionOutlined")
);

type Props = {
  disabled?: boolean;
  add?: IconButtonProps;
  update?: IconButtonProps;
  destroy?: IconButtonProps;
  refresh?: IconButtonProps;
  addInvoice?: IconButtonProps;
};

const IconButtonGroup = (props: Props) => {
  const renderButton = (props: Props) => {
    const buttons: IconButtonProps[] = [];
    if (props.add) {
      buttons.push({
        disabled: props.disabled,
        color: "primary",
        children: (
          <React.Suspense fallback="loading...">
            <AddIcon />
          </React.Suspense>
        ),
        ...props.add,
      });
    }

    if (props.addInvoice) {
      buttons.push({
        disabled: props.disabled,
        color: "primary",
        children: (
          <React.Suspense fallback="loading...">
            <DescriptionOutlinedIcon />
          </React.Suspense>
        ),
        ...props.addInvoice,
      });
    }

    if (props.update) {
      buttons.push({
        color: "primary",
        children: (
          <React.Suspense fallback="loading...">
            <EditOutlinedIcon />
          </React.Suspense>
        ),
        ...props.update,
      });
    }

    if (props.destroy) {
      buttons.push({
        children: (
          <React.Suspense fallback="loading...">
            <Delete />
          </React.Suspense>
        ),
        ...props.destroy,
      });
    }

    if (props.refresh) {
      buttons.push({
        children: (
          <React.Suspense fallback="loading...">
            <RefreshIcon />
          </React.Suspense>
        ),
        ...props.refresh,
      });
    }

    return buttons;
  };

  return (
    <Stack direction="row" spacing={1}>
      {renderButton(props).map((button, i) => (
        <div key={i}>
          <IconButton {...button} />
        </div>
      ))}
    </Stack>
  );
};

export default IconButtonGroup;
