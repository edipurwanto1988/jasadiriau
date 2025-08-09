import React from "react";
import InputAdornment from "@mui/material/InputAdornment";
import TableCell, { TableCellProps } from "@mui/material/TableCell";
import { TextFieldProps } from "@mui/material/TextField";

import InputSelect, { InputSelectItem } from "../Input/InputSelect";

const TextField = React.lazy(() => import("@mui/material/TextField"));
const Search = React.lazy(() => import("@mui/icons-material/Search"));

export type FilterCellProps = {
  type: "text" | "date" | "select" | "datetime-local";
  value: any;
  items: InputSelectItem[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  options?: TextFieldProps;
  filterOptions?: TextFieldProps;
} & Omit<TableCellProps, "onChange">;

const FilterCell = ({
  type,
  value,
  options,
  filterOptions,
  items,
  onChange,
  ...props
}: FilterCellProps) => {
  return (
    <TableCell
      variant="head"
      size="small"
      padding="none"
      align="center"
      {...props}
    >
      {["text", "date", "datetime-local"].includes(type) ? (
        <React.Suspense fallback="loading...">
          <TextField
            fullWidth
            type={type}
            margin="none"
            variant="outlined"
            size="small"
            value={value}
            InputProps={{
              endAdornment:
                type === "text" ? (
                  <InputAdornment position="end">
                    <React.Suspense fallback="loading...">
                      <Search color="disabled" />
                    </React.Suspense>
                  </InputAdornment>
                ) : null,
            }}
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "transparent",
                borderRadius: 0,
              },
              m: 0,
              p: 0,
              mt: 0,
              mb: 0,
            }}
            onChange={onChange}
            {...filterOptions}
            {...options}
          />
        </React.Suspense>
      ) : type === "select" ? (
        <InputSelect
          fullWidth
          variant="outlined"
          margin="none"
          size="small"
          value={value}
          items={items}
          onChange={onChange}
          {...filterOptions}
          {...options}
          sx={{
            m: 0,
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "transparent",
              borderRadius: 0,
            },
          }}
        />
      ) : null}
    </TableCell>
  );
};

export default FilterCell;
