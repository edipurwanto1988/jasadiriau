import { forwardRef } from "react";
import NumberFormatInput, { NumberFormatInputProps } from "./NumberFormatInput";

const NumberFormat = forwardRef<
  any,
  NumberFormatInputProps & {
    onChange: (event: { target: { value: string; name: string } }) => void;
    name: string;
  }
>(({ onChange, name, prefix, ...props }, ref) => (
  <NumberFormatInput
    getInputRef={ref}
    onChange={({ value }) => {
      onChange({ target: { value, name } });
    }}
    thousandSeparator="."
    decimalSeparator=","
    prefix="Rp"
    {...props}
  />
));

export default NumberFormat;
