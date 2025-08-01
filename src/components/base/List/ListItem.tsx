import React from "react";

import {
  default as MUIListItem,
  ListItemProps as MUIListItemProps,
} from "@mui/material/ListItem";
import ListItemButton, {
  ListItemButtonProps,
} from "@mui/material/ListItemButton";
import ListItemIcon, { ListItemIconProps } from "@mui/material/ListItemIcon";
import ListItemText, { ListItemTextProps } from "@mui/material/ListItemText";
import Skeleton from "@mui/material/Skeleton";

export interface ListProps extends Omit<MUIListItemProps, "onClick"> {
  button?: boolean;
  loading?: boolean;
  primary?: React.ReactNode;
  secondary?: React.ReactNode;
  icon?: React.ReactNode;
  textProps?: ListItemTextProps;
  iconProps?: ListItemIconProps;
  buttonProps?: Omit<ListItemButtonProps, "onClick">;
  onClick?: React.MouseEventHandler;
}

const ListItem = ({
  loading,
  button,
  primary,
  secondary,
  icon,
  textProps,
  iconProps,
  buttonProps,
  secondaryAction,
  onClick,
  ...props
}: ListProps) => {
  return loading ? (
    <MUIListItem>
      <Skeleton />
    </MUIListItem>
  ) : (
    <MUIListItem divider {...props} secondaryAction={secondaryAction}>
      {button ? (
        <ListItemButton onClick={onClick} {...buttonProps}>
          {icon ? <ListItemIcon {...iconProps}>{icon}</ListItemIcon> : null}
          <ListItemText
            primary={primary}
            secondary={secondary}
            {...textProps}
          />
        </ListItemButton>
      ) : (
        <>
          {icon ? <ListItemIcon {...iconProps}>{icon}</ListItemIcon> : null}
          <ListItemText
            primary={primary}
            secondary={secondary}
            {...textProps}
          />
        </>
      )}
    </MUIListItem>
  );
};

export default React.memo(
  ListItem,
  (p, n) =>
    p.primary === n.primary &&
    p.loading == n.loading &&
    p.secondary === n.secondary &&
    p.button === n.button &&
    p.icon === n.icon
) as typeof ListItem;
