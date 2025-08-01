import Box, { BoxProps } from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import { useId } from "react";
export interface ButtonFileProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  wrapper?: BoxProps;
  labelProp?: React.DetailedHTMLProps<
    React.LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  >;
  title?: string;
  children?: React.ReactNode;
}

const ButtonFile = ({
  wrapper,
  labelProp,
  children,
  title,
  ...props
}: ButtonFileProps) => {
  const id = useId();
  return (
    <Tooltip title={title}>
      <Box component="div" {...wrapper}>
        <label htmlFor={id} {...labelProp}>
          {children}
        </label>
        <input
          id={id}
          type="file"
          accept="image/*"
          style={{ display: "none", cursor: "crosshair" }}
          {...props}
        />
      </Box>
    </Tooltip>
  );
};

export default ButtonFile;
