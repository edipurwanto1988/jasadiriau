import LoadComponent from "@/views/components/base/LoadComponent/LoadComponent";
import { SvgIconTypeMap } from "@mui/material/SvgIcon";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { DefaultComponentProps } from "@mui/material/OverridableComponent";

const ConfirmationNumberOutlinedIcon = LoadComponent(
  () => import("@mui/icons-material/ConfirmationNumberOutlined")
);

const HailOutlinedIcon = LoadComponent(
  () => import("@mui/icons-material/HailOutlined")
);

const SpeakerNotesOutlinedIcon = LoadComponent(
  () => import("@mui/icons-material/SpeakerNotesOutlined")
);

const KeyboardArrowDownIcon = LoadComponent(
  () => import("@mui/icons-material/KeyboardArrowDown")
);

const KeyboardArrowUpIcon = LoadComponent(
  () => import("@mui/icons-material/KeyboardArrowUp")
);

const DeleteOutlineOutlinedIcon = LoadComponent(
  () => import("@mui/icons-material/DeleteOutlineOutlined")
);

type Props = IconButtonProps & {
  icon:
    | "HailOutlinedIcon"
    | "SpeakerNotesOutlinedIcon"
    | "ConfirmationNumberOutlinedIcon"
    | "KeyboardArrowDownIcon"
    | "KeyboardArrowUpIcon"
    | "DeleteOutlineOutlinedIcon";
  iconProps?: DefaultComponentProps<SvgIconTypeMap<{}, "svg">>;
};

const ButtonIcon = ({ icon, iconProps, ...props }: Props) => {
  const renderIcon = () => {
    if (icon === "HailOutlinedIcon") {
      return <HailOutlinedIcon fontSize="small" {...iconProps} />;
    } else if (icon === "SpeakerNotesOutlinedIcon") {
      return <SpeakerNotesOutlinedIcon fontSize="small" {...iconProps} />;
    } else if (icon === "ConfirmationNumberOutlinedIcon") {
      return (
        <ConfirmationNumberOutlinedIcon
          fontSize="small"
          color="action"
          {...iconProps}
        />
      );
    } else if (icon === "KeyboardArrowDownIcon") {
      return (
        <KeyboardArrowDownIcon fontSize="inherit" color="action" {...iconProps} />
      );
    } else if (icon === "KeyboardArrowUpIcon") {
      return (
        <KeyboardArrowUpIcon fontSize="inherit" color="action" {...iconProps} />
      );
    } else if (icon === "DeleteOutlineOutlinedIcon") {
      return <DeleteOutlineOutlinedIcon fontSize="small" />;
    }
  };

  return (
    <IconButton size="small" {...props}>
      {renderIcon()}
    </IconButton>
  );
};

export default ButtonIcon;
