import LoadComponent from "@/views/components/base/LoadComponent/LoadComponent";
import { SvgIconTypeMap } from "@mui/material/SvgIcon";
import Button, { ButtonProps } from "@mui/material/Button";
import { DefaultComponentProps } from "@mui/material/OverridableComponent";
import IconButton from "@mui/material/IconButton";

const RestartAltOutlinedIcon = LoadComponent(
  () => import("@mui/icons-material/RestartAltOutlined")
);
const AddOutlinedIcon = LoadComponent(
  () => import("@mui/icons-material/AddOutlined")
);

const CalendarMonthOutlinedIcon = LoadComponent(
  () => import("@mui/icons-material/CalendarMonthOutlined")
);

const EditNoteOutlinedIcon = LoadComponent(
  () => import("@mui/icons-material/EditNoteOutlined")
);

const ConfirmationNumberOutlinedIcon = LoadComponent(
  () => import("@mui/icons-material/ConfirmationNumberOutlined")
);

const DeleteOutlineOutlinedIcon = LoadComponent(
  () => import("@mui/icons-material/DeleteOutlineOutlined")
);

type Props = Omit<ButtonProps, "startIcon" | "endIcon"> & {
  typeButton?: "icon" | "button";
  position: "start" | "end";
  iconProps?: DefaultComponentProps<SvgIconTypeMap<{}, "svg">>;
  icon:
    | "RestartAltOutlinedIcon"
    | "AddOutlinedIcon"
    | "CalendarMonthOutlinedIcon"
    | "EditNoteOutlinedIcon"
    | "ConfirmationNumberOutlinedIcon"
    | "DeleteOutlineOutlinedIcon";
};

const ButtonWithIcon = ({
  typeButton,
  icon,
  position,
  iconProps,
  ...props
}: Props) => {
  const renderIcon = () => {
    if (icon === "RestartAltOutlinedIcon") {
      return <RestartAltOutlinedIcon fontSize="inherit" {...iconProps} />;
    } else if (icon === "AddOutlinedIcon") {
      return <AddOutlinedIcon fontSize="inherit" {...iconProps} />;
    } else if (icon === "CalendarMonthOutlinedIcon") {
      return <CalendarMonthOutlinedIcon fontSize="inherit" {...iconProps} />;
    } else if (icon === "EditNoteOutlinedIcon") {
      return <EditNoteOutlinedIcon fontSize="inherit" {...iconProps} />;
    } else if (icon === "ConfirmationNumberOutlinedIcon") {
      return <ConfirmationNumberOutlinedIcon {...iconProps} />;
    } else if (icon === "DeleteOutlineOutlinedIcon") {
      return <DeleteOutlineOutlinedIcon fontSize="inherit" />;
    }
  };

  if (typeButton === "icon") {
    return (
      <IconButton color="primary" onClick={props.onClick} size="small">
        {renderIcon()}
      </IconButton>
    );
  }

  return (
    <Button
      size="small"
      {...props}
      startIcon={position === "start" ? renderIcon() : undefined}
      endIcon={position === "end" ? renderIcon() : undefined}
    />
  );
};

export default ButtonWithIcon;
