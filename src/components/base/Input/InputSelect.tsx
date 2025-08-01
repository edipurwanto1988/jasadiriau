import { ListItemTextProps } from "@mui/material/ListItemText";
import { MenuItemProps } from "@mui/material/MenuItem";
import { TextFieldProps } from "@mui/material/TextField";
import { lazy, Suspense, useId } from "react";
import Loading from "../Skeleton/Spinner";

const TextField = lazy(() => import("@mui/material/TextField"));

export type InputSelectItem = {
  primary: any;
  secondary?: any;
  value: any;
  itemProps?: MenuItemProps;
  textProps?: ListItemTextProps;
};

export type InputSelectProps = TextFieldProps & {
  items: InputSelectItem[];
  selectText?: string;
};

const InputSelect = ({
  value,
  selectText,
  items,
  ...props
}: InputSelectProps) => {
  const id = useId();
  return (
    <Suspense fallback={<Loading />}>
      <TextField
        id={id}
        select
        value={value === undefined || value === "" ? "00" : value}
        sx={
          {
            // "& .MuiOutlinedInput-root > .MuiSelect-select": {
            //   minHeight: 0,
            // },
          }
        }
        slotProps={{
          inputLabel: { htmlFor: id, shrink: true },
          select: { native: true },
        }}
        {...props}
      >
        <option key="00-menu-item" value={"00"}>
          {selectText ?? "Pilihan"}
        </option>

        {items.map(({ primary, value: itemValue }, i: number) => (
          <option key={`${i}-menu-item`} value={itemValue}>
            {primary}
          </option>
        ))}
      </TextField>
    </Suspense>
  );
};

export default InputSelect;
