import { TextFieldProps } from "@mui/material/TextField";
import { lazy, Suspense } from "react";
// import { NumericFormat, NumericFormatProps } from "react-number-format";

const TextField = lazy(() => import("@mui/material/TextField"));

export type InputCurrencyProps = TextFieldProps & {
  thousandSeparator?: string;
  decimalSeparator?: string;
  decimalScale?: number;
  allowNegative?: boolean;
  prefix?: string;
};

const InputCurrency = ({
  thousandSeparator,
  decimalScale,
  decimalSeparator,
  allowNegative,
  prefix,
  ...props
}: InputCurrencyProps) => {
  const formatValue = (val: string): string => {
    if (val === "" || val === null || val === undefined) return "";

    // Remove prefix for formatting
    let rawValue = val.startsWith(prefix) ? val.substring(prefix.length) : val;

    // Remove non-numeric characters (except decimal and negative sign)
    const numericValue = rawValue.replace(
      new RegExp(`[^0-9${decimalSeparator}-]`, "g"),
      ""
    );

    // Handle negative values
    const isNegative = allowNegative && numericValue[0] === "-";
    const absValue = isNegative ? numericValue.substring(1) : numericValue;

    // Split into integer and decimal parts
    let [integer, decimal] = absValue.split(decimalSeparator);

    // Add thousand separators to the integer part
    integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator ?? "");

    // Limit decimal places if applicable
    if (decimalScale !== null && decimal !== undefined) {
      decimal = decimal.substring(0, decimalScale);
    }

    // Combine prefix, integer, and decimal parts
    const formattedValue = `${integer}${
      decimal !== undefined ? `${decimalSeparator}${decimal}` : ""
    }`;
    return isNegative
      ? `-${prefix}${formattedValue}`
      : `${prefix}${formattedValue}`;
  };

  return (
    <Suspense fallback="loading">
      <TextField
        {...props}
        value={formatValue(String(props.value))}
        onChange={(e) => {
          e.target.value = e.target.value.replace(/[^0-9]/g, "");
          props.onChange(e);
        }}
      />
    </Suspense>
  );
};

export default InputCurrency;
