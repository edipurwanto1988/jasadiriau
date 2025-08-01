import React from "react";
import Divider from "@mui/material/Divider";
import ListItemText, { ListItemTextProps } from "@mui/material/ListItemText";
import MenuItem, { MenuItemProps } from "@mui/material/MenuItem";
import { TextFieldProps } from "@mui/material/TextField";
import { lazy, Suspense, useId } from "react";
import  ListSubheader from "@mui/material/ListSubheader";

const TextField = lazy(() => import("@mui/material/TextField"));

export type GroupSelectItem = {
  primary: any;
  secondary?: any;
  value: any;
  itemProps?: MenuItemProps;
  textProps?: ListItemTextProps;
};

export type GroupSelectProps = TextFieldProps & {
  items: { text: string; data: GroupSelectItem[] }[];
  selectText?: string;
};

const GroupSelect = ({
  value,
  selectText,
  items,
  ...props
}: GroupSelectProps) => {
  const id = useId();

  const _items = React.useMemo(() => {
    let index = 0;
    const temp = [];
    for (const group of items) {
      index = index + 1;
      temp.push(
        <ListSubheader sx={{ fontWeight: 500 }} key={index}>
          {group.text}
        </ListSubheader>
      );
      for (const { primary, secondary, value, ...other } of group.data) {
        index = index + 1;
        temp.push(
          <MenuItem
            key={`${index}-menu-item`}
            value={value}
            {...other.itemProps}
          >
            <ListItemText
              primary={primary}
              secondary={secondary}
              sx={{ m: 0 }}

              {...other.textProps}
            />
          </MenuItem>
        );
      }
    }

    return temp;
  }, [items]);

  return (
    <Suspense fallback="loading">
      <TextField
        id={id}
        select
        value={value || "00"}
        size="small"
        sx={{
          "& .MuiOutlinedInput-root > .MuiSelect-select": {
            minHeight: 0,
          },
        }}
        InputLabelProps={{ htmlFor: id }}
        {...props}
      >
        <MenuItem key="00-menu-item" value={"00"} selected>
          <ListItemText
            primary={selectText || "Select"}
            primaryTypographyProps={{
              sx: (theme) => ({
                color: theme.palette.grey[500],
                textAlign: "left",
              }),
            }}
            sx={{ m: 0 }}
          />
        </MenuItem>
        <Divider sx={{ m: 0, "&.MuiDivider-root": { m: 0 } }} />
        {_items}
      </TextField>
    </Suspense>
  );
};

export default GroupSelect;
