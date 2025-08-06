import {
  ButtonGroupProps,
  default as MUIButtonGroup,
} from "@mui/material/ButtonGroup";
import Button, { ButtonProps } from "@mui/material/Button";

interface Props extends ButtonGroupProps {
  buttons: Array<ButtonProps>;
}

const ButtonGroup = ({ buttons, ...props }: Props) => {
  return (
    <MUIButtonGroup {...props}>
      {buttons.length > 0
        ? buttons.map((btn, i) => <Button key={i} variant="contained" size="small" disableElevation {...btn} />)
        : null}
    </MUIButtonGroup>
  );
};

export default ButtonGroup;
