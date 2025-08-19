import { actionLabel } from "@/utils/string";
import Chip from "@mui/material/Chip";
import LoadComponent from "../LoadComponent/LoadComponent";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const PendingActionsIcon = LoadComponent(
  () => import("@mui/icons-material/PendingActions")
);

const CheckCircleOutlineIcon = LoadComponent(
  () => import("@mui/icons-material/CheckCircleOutline")
);

const BlockIcon = LoadComponent(() => import("@mui/icons-material/Block"));

type Props = {
  action?: "approved" | "rejected" | null;
  icon?: boolean;
};

const ActionChip = ({ action, icon }: Props) => {
  if (icon) {
    return (
      <Stack direction={"row"} spacing={1} alignItems={"center"}>
        {action === "approved" ? (
          <CheckCircleOutlineIcon fontSize="small" />
        ) : action === "rejected" ? (
          <BlockIcon fontSize="small" />
        ) : (
          <PendingActionsIcon fontSize="small" />
        )}
        <Box flexGrow={1} minHeight={"24px"}>
          <Typography>{actionLabel(action)}</Typography>
        </Box>
      </Stack>
    );
  }
  return (
    <Chip
      label={actionLabel(action)}
      variant="filled"
      size="small"
      color={
        action === "approved"
          ? "success"
          : action === "rejected"
          ? "error"
          : "default"
      }
      slotProps={{
        label: {
          sx: {
            fontWeight: 500,
          },
        },
      }}
    />
  );
};

export default ActionChip;
