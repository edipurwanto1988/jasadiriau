"use client";
import { dateFormat } from "@/utils/format";
import ActionChip from "@/views/components/base/Chip/ActionChip";
import LoadComponent from "@/views/components/base/LoadComponent/LoadComponent";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

type Props = {
  data: Validation[];
  loading?: boolean;
  onValidation?: (id: number, action: string) => () => void;
};

const BusinessValidationItem = ({ data, loading, onValidation }: Props) => {
  return (
    <Stack direction={"column"} width={350} py={2}>
      <Fade in={loading} unmountOnExit>
        <Stack direction={"column"} spacing={1}>
          <Skeleton width={"110%"} />
          <Skeleton width={"70%"} />
          <Skeleton width={"80%"} />
        </Stack>
      </Fade>
      {data.map((value) => (
        <Paper variant="outlined" key={value.id} sx={{ p: 2 }}>
          <Stack direction={"column"} spacing={2}>
            <ActionChip action={value.action} icon />

            <Typography variant="body2">
              Divalidasi Tanggal:{" "}
              {dateFormat(value.validatedAt, { time: true })}
            </Typography>

            <ListItemText
              primary="Catatan"
              secondary={value.note ?? "-"}
              slotProps={{
                primary: {
                  variant: "body2",
                },
                secondary: {
                  variant: "body2",
                },
              }}
            />

            <Typography variant="body2">
              Dibuat Tanggal: {dateFormat(value.createdAt, { time: true })}
            </Typography>

            {onValidation && !value.action ? (
              <Stack direction={"row"} justifyContent={"flex-end"}>
                <div>
                  <Button
                    size="small"
                    color="error"
                    onClick={onValidation(value.id!, "rejected")}
                  >
                    Tolak
                  </Button>
                </div>
                <div>
                  <Button
                    size="small"
                    onClick={onValidation(value.id!, "approved")}
                  >
                    Setujui
                  </Button>
                </div>
              </Stack>
            ) : null}
          </Stack>
        </Paper>
      ))}
    </Stack>
  );
};

export default BusinessValidationItem;
