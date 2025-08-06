import React from "react";
import LoadComponent from "@/views/components/base/LoadComponent/LoadComponent";
import { TextFieldProps } from "@mui/material";

const TextField = LoadComponent(() => import("@mui/material/TextField"));

const InputField = React.memo(
  ({ value, onChange, ...props }: TextFieldProps) => {
    return <TextField {...props} value={value} onChange={onChange} />;
  },
  (prev, next) =>
    prev.value === next.value &&
    prev.error === next.error &&
    prev.helperText === next.helperText
);

export default InputField;
