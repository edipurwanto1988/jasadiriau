"use client";
import { dateFormat } from "@/utils/format";
import ActionChip from "@/views/components/base/Chip/ActionChip";
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
  hasPending?: boolean;
  onValidation?: (id: number, action: string) => () => void;
  onResend?: () => void;
};

const BusinessValidationItem = ({
  data,
  loading,
  hasPending,
  onValidation,
  onResend,
}: Props) => {
  return (
    <Stack direction={"column"} py={2} spacing={1}>
      <Fade in={loading} unmountOnExit>
        <Stack direction={"column"} spacing={1}>
          <Skeleton width={"100%"} />
          <Skeleton width={"70%"} />
          <Skeleton width={"80%"} />
        </Stack>
      </Fade>

      {data.map((value, i) => (
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
              <Stack direction={"row"} justifyContent={"flex-end"} spacing={1}>
                <div>
                  <Button
                    size="small"
                    color="error"
                    variant="outlined"
                    disableElevation
                    onClick={onValidation(value.id!, "rejected")}
                  >
                    Tolak
                  </Button>
                </div>
                <div>
                  <Button
                    size="small"
                    onClick={onValidation(value.id!, "approved")}
                    variant="outlined"
                    color="success"
                    disableElevation
                  >
                    Setujui
                  </Button>
                </div>
              </Stack>
            ) : value.action === "rejected" && !hasPending && i === 0 ? (
              <div>
                <Button variant="contained" disableElevation onClick={onResend}>
                  Pengajuan Ulang
                </Button>
              </div>
            ) : null}
          </Stack>
        </Paper>
      ))}
    </Stack>
  );
};

export default BusinessValidationItem;
