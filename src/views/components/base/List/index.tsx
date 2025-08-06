import React from "react";
import {
  default as MUIList,
  ListProps as MUIListProps,
} from "@mui/material/List";
import ListItem, { ListItemProps } from "@mui/material/ListItem";
import ListItemButton, {
  ListItemButtonProps,
} from "@mui/material/ListItemButton";
import ListItemIcon, { ListItemIconProps } from "@mui/material/ListItemIcon";
import ListItemText, { ListItemTextProps } from "@mui/material/ListItemText";
import Skeleton from "@mui/material/Skeleton";
import TransitionGroup from "react-transition-group/TransitionGroup";
import Fade from "@mui/material/Fade";
import Button, { ButtonProps } from "@mui/material/Button";

type ItemList = ListItemProps & {
  button?: boolean;
  primary?: React.ReactNode;
  secondary?: React.ReactNode;
  icon?: React.ReactNode;
  textProps?: ListItemTextProps;
  iconProps?: ListItemIconProps;
  buttonProps?: ListItemButtonProps;
};

export type ColumnProps = ItemList;

export interface ListProps<T> extends MUIListProps {
  loading?: boolean;
  data: T[];
  emptyProps?: ListItemProps;
  emptyText?: string;
  emptyTextProps?: ListItemTextProps;
  renderItem: (data: T, index: number) => ColumnProps;
  moreButton?: boolean;
  moreButtonProps?: ButtonProps;
}

const List = <T,>({
  loading,
  data,
  emptyText,
  emptyProps,
  emptyTextProps,
  moreButton,
  moreButtonProps,
  renderItem,
  ...props
}: ListProps<T>) => {
  const item = (col: ColumnProps, i: number) => {
    const {
      button,
      primary,
      secondary,
      secondaryAction,
      icon,
      textProps,
      iconProps,
      buttonProps,
      ...o
    } = col;
    return (
      <Fade key={i}>
        <ListItem divider {...o} secondaryAction={secondaryAction}>
          {button ? (
            <ListItemButton {...buttonProps}>
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
        </ListItem>
      </Fade>
    );
  };

  const renderMore = (
    data: T[],
    isMore?: boolean,
    buttonProps?: ButtonProps
  ) => {
    const _data = data.map((val, i) => item(renderItem(val, i), i));

    if (isMore && !!data.length) {
      _data.push(
        <Fade key={data.length}>
          <ListItem sx={{ justifyContent: "center" }}>
            <Button variant="text" size="small" {...buttonProps}>
              Tampilkan lebih banyak
            </Button>
          </ListItem>
        </Fade>
      );
    }

    return _data;
  };

  return (
    <MUIList component={TransitionGroup} {...props}>
      {loading ? (
        [1, 2].map((v) => (
          <Fade key={v}>
            <ListItem>
              <Skeleton width={"100%"} />
            </ListItem>
          </Fade>
        ))
      ) : !!data.length ? (
        renderMore(data, moreButton, moreButtonProps)
      ) : (
        <Fade>
          <ListItem disablePadding {...emptyProps}>
            <ListItemText
              primary={emptyText || "Data not available"}
              {...emptyTextProps}
            />
          </ListItem>
        </Fade>
      )}
    </MUIList>
  );
};

export default List
