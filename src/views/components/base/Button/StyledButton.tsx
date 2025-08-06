import React from "react";
import Button, { ButtonProps } from "@mui/material/Button";

const AddIcon = React.lazy(() => import("@mui/icons-material/Add"));
const CancelIcon = React.lazy(() => import("@mui/icons-material/ClearAll"));

export interface StyledButtonProps extends ButtonProps {
  underline?: boolean;
  icon?: "add" | "remove" | "cancel";
}

const renderIcon = (icon: StyledButtonProps["icon"]) => {
  if (icon) {
    if (icon === "add") {
      return (
        <React.Suspense fallback={<span></span>}>
          <AddIcon fontSize="inherit" />
        </React.Suspense>
      );
    } else if (icon === "cancel") {
      return (
        <React.Suspense fallback={<span></span>}>
          <CancelIcon fontSize="inherit" />
        </React.Suspense>
      );
    }
  }
};

const StyledButton = ({ underline, icon, sx, ...props }: StyledButtonProps) => {
  if (icon) {
    props.startIcon = renderIcon(icon);
  }
  return (
    <Button
      {...props}
      sx={{
        ...sx,
        ...(underline && {
          textDecoration: "underline",
          textUnderlineOffset: "3px",
        }),
      }}
    />
  );
};

export default StyledButton;
