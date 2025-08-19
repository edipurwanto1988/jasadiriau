import { statusActiveLabel } from "@/utils/string";
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
  status: "pending" | "active" | "inactive";
  icon?: boolean;
};
const StatusChip = ({ status, icon }: Props) => {
  if (icon) {
    return (
      <Stack direction={"row"} spacing={1} alignItems={"center"}>
        {status === "active" ? (
          <CheckCircleOutlineIcon fontSize="small" />
        ) : status === "pending" ? (
          <PendingActionsIcon fontSize="small" />
        ) : (
          <BlockIcon fontSize="small" />
        )}
        <Box flexGrow={1} minHeight={"24px"}>
          <Typography>{statusActiveLabel(status)}</Typography>
        </Box>
      </Stack>
    );
  }
  return (
    <Chip
      label={statusActiveLabel(status)}
      variant="filled"
      size="small"
      color={
        status === "pending"
          ? "default"
          : status === "active"
          ? "success"
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

export default StatusChip;
