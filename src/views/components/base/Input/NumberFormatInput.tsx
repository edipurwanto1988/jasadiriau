import React, { ChangeEvent, useRef, useEffect } from 'react';

export interface NumberFormatInputProps {
  value?: string;
  onChange?: (value: any) => void;
  thousandSeparator?: string;
  decimalSeparator?: string;
  decimalScale?: number;
  allowNegative?: boolean;
  getInputRef?: any
  prefix?: string;
}

const NumberFormatInput: React.FC<NumberFormatInputProps> = ({
  value = '',
  onChange,
  thousandSeparator = ',',
  decimalSeparator = '.',
  decimalScale = 2,
  allowNegative = false,
  getInputRef,
  prefix = '',
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (getInputRef) {
      getInputRef(inputRef.current);
    }
  }, [getInputRef]);

  const formatValue = (val: string): string => {
    if (val === '' || val === null || val === undefined) return '';

    // Remove prefix for formatting
    let rawValue = val.startsWith(prefix) ? val.substring(prefix.length) : val;

    // Remove non-numeric characters (except decimal and negative sign)
    const numericValue = rawValue.replace(new RegExp(`[^0-9${decimalSeparator}-]`, 'g'), '');

    // Handle negative values
    const isNegative = allowNegative && numericValue[0] === '-';
    const absValue = isNegative ? numericValue.substring(1) : numericValue;

    // Split into integer and decimal parts
    let [integer, decimal] = absValue.split(decimalSeparator);

    // Add thousand separators to the integer part
    integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator);

    // Limit decimal places if applicable
    if (decimalScale !== null && decimal !== undefined) {
      decimal = decimal.substring(0, decimalScale);
    }

    // Combine prefix, integer, and decimal parts
    const formattedValue = `${integer}${decimal !== undefined ? `${decimalSeparator}${decimal}` : ''}`;
    return isNegative ? `-${prefix}${formattedValue}` : `${prefix}${formattedValue}`;
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const rawValue = e.target.value;
    const valueWithoutPrefix = rawValue.startsWith(prefix) ? rawValue.substring(prefix.length) : rawValue;

    if (onChange) {
      // Clean value for the onChange callback
      const cleanValue = valueWithoutPrefix.replace(new RegExp(`[^0-9${decimalSeparator}-]`, 'g'), '');
      onChange(cleanValue);
    }
  };

  return (
    <input
      type="text"
      ref={inputRef}
      value={formatValue(value)}
      onChange={handleInputChange}
      placeholder="Enter a number"
    />
  );
};

export default NumberFormatInput;
