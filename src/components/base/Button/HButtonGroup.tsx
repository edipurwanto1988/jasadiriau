import React from "react";
import ButtonGroup from "@/components/base/Button/ButtonGroup";
import { ButtonProps } from "@mui/material/Button";

const AddIcon = React.lazy(() => import("@mui/icons-material/Add"));
const EditOutlinedIcon = React.lazy(
  () => import("@mui/icons-material/EditOutlined")
);
const RefreshIcon = React.lazy(() => import("@mui/icons-material/Refresh"));
const Delete = React.lazy(() => import("@mui/icons-material/DeleteOutline"));
const DescriptionOutlinedIcon = React.lazy(() => import( '@mui/icons-material/DescriptionOutlined'))

type Props = {
  disabled?: boolean;
  add?: ButtonProps;
  update?: ButtonProps;
  destroy?: ButtonProps;
  refresh?: ButtonProps;
  addInvoice?: ButtonProps;
};

const HButtonGroup = (props: Props) => {
  const renderButton = (props: Props) => {
    const buttons: ButtonProps[] = [];
    if (props.add) {
      buttons.push({
        disabled: props.disabled,
        variant: "contained",
        color: "primary",
        startIcon: (
          <React.Suspense fallback="loading...">
            <AddIcon />
          </React.Suspense>
        ),
        disableElevation: true,
        ...props.add,
      });
    }

    if (props.addInvoice) {
      buttons.push({
        disabled: props.disabled,
        variant: "contained",
        color: "primary",
        startIcon: (
          <React.Suspense fallback="loading...">
            <DescriptionOutlinedIcon />
          </React.Suspense>
        ),
        disableElevation: true,
        ...props.addInvoice,
      });
    }

    if (props.update) {
      buttons.push({
        variant: "contained",
        color: "primary",
        startIcon: (
          <React.Suspense fallback="loading...">
            <EditOutlinedIcon />
          </React.Suspense>
        ),
        disableElevation: true,
        ...props.update,
      });
    }

    if (props.destroy) {
      buttons.push({
        variant: "outlined",
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
        variant: "outlined",
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

  return <ButtonGroup buttons={renderButton(props)} />;
};

export default HButtonGroup;
