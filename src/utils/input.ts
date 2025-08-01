import { TextFieldProps } from "@mui/material/TextField";
import { UseMutation } from "ezhooks/lib/useMutation";

export const register = <T = any>(
  key: string,
  form: UseMutation<T>
): TextFieldProps => {
  return {
    value: form.value(key as any),
    onChange: (e) => form.setData({ [key]: e.target.value }),
  };
};

export const formatPhoneNumber = (input: string) => {
  if (input.startsWith("0")) {
    return input.slice(1);
  }
  return input;
};
