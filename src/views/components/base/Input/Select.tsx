import Divider from "@mui/material/Divider";
import FormHelperText from "@mui/material/FormHelperText";
import { TextFieldProps } from "@mui/material/TextField";
import MenuItem, { MenuItemProps } from "@mui/material/MenuItem";
import React from "react";

const TextField = React.lazy(() => import("@mui/material/TextField"));

export type SelectProps = {
  menu: Partial<{ text: any } & MenuItemProps>[];
  setValue: (value) => void;
  message?: string;
} & TextFieldProps;

const Select = ({
  fullWidth,
  value,
  menu,
  setValue,
  message,
  ...selectProps
}: SelectProps) => {
  return (
    <>
      <React.Suspense fallback="loading...">
        <TextField
          select
          value={value}
          onChange={(e) => {
            setValue({ [e.target.name]: e.target.value });
          }}
          {...selectProps}
        >
          {menu.map(({ text, ..._menu }, i) => (
            <div key={`menu-${i}_${Math.random() * 1000}`}>
              <MenuItem {..._menu}>{text}</MenuItem>
              {menu.length !== i + 1 && (
                <Divider
                  sx={{
                    "&.MuiDivider-root": {
                      marginTop: 0,
                      marginBottom: 0,
                    },
                  }}
                />
              )}
            </div>
          ))}
        </TextField>
      </React.Suspense>
      <FormHelperText error={message !== ""}>{message}</FormHelperText>
    </>
  );
};

export default Select;

Select.defaultProps = {
  label: "",
  menu: [],
};
