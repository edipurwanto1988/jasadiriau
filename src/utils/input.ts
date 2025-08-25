export const formatPhoneNumber = (input: string) => {
  if (input.startsWith("0")) {
    return input.slice(1);
  }
  return input;
};

export function fillNextNumber(arr: number[]): number {
  if (arr.length === 0) return 1;

  const sorted = [...arr].sort((a, b) => a - b);

  for (let i = 0; i < sorted.length; i++) {
    const expected = i === 0 ? 1 : sorted[i - 1] + 1;
    if (sorted[i] !== expected) {
      return expected;
    }
  }

  return sorted[sorted.length - 1] + 1;
}

export const formatValueRupiah = (val: string): string => {
  const prefix = "Rp";
  const decimalSeparator = ",";
  const thousandSeparator = ".";
  const allowNegative = false;
  const decimalScale = 2;
  if (val === "" || val === null || val === undefined) return "";

  if (!prefix) return val;

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
  let [integer, decimal] = absValue.split(decimalSeparator || ",");

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
