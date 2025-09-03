import ActionChip from "@/views/components/base/Chip/ActionChip";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Collapse from "@mui/material/Collapse";
import TransitionGroup from "react-transition-group/TransitionGroup";
import RoleComponent from "@/views/components/base/Role/RoleComponent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LoadComponent from "@/views/components/base/LoadComponent/LoadComponent";
import { dateFormat } from "@/utils/format";

const HistoryIcon = LoadComponent(() => import("@mui/icons-material/History"));

type Props = {
  data: Validation[];
  loading?: boolean;
  onValidation?: (id: number, action: string) => () => void;
  onResend?: () => void;
};

const ValidationItem = ({ data, loading, onValidation, onResend }: Props) => {
  return (
    <Stack direction={"column"} py={2} spacing={2}>
      <Stack direction={"row"} alignItems={"center"} spacing={1}>
        <HistoryIcon />
        <Typography fontWeight={600}>Riwayat Validasi</Typography>
      </Stack>

      <Fade in={loading} unmountOnExit>
        <Stack direction={"column"} spacing={1}>
          <Skeleton width={"100%"} />
          <Skeleton width={"70%"} />
          <Skeleton width={"80%"} />
        </Stack>
      </Fade>

      <TransitionGroup component={Stack} direction={"column"} spacing={1}>
        {data.map((value, i) => (
          <Collapse key={i}>
            <Paper variant="outlined" sx={{ p: 2, overflow: "auto hidden" }}>
              <Stack direction={"column"} spacing={1}>
                <Stack direction={"row"} justifyContent={'space-between'} alignItems={"center"} spacing={2}>
                  <Box flexBasis={"20%"}>
                    <ActionChip action={value.action} icon />
                  </Box>

                  <Box
                    sx={{
                      flexBasis: {
                        xs: "unset",
                        sm: "unset",
                        md: "30%",
                        lg: "30%",
                        xl: "30%",
                      },
                    }}
                  >
                    <ListItemText
                      primary="Catatan"
                      secondary={value.note || "Tidak ada catatan."}
                      slotProps={{
                        primary: {
                          variant: "body2",
                          fontWeight: 700,
                        },
                        secondary: {
                          variant: "body2",
                          whiteSpace: "pre-line",
                          sx:{
                            wordBreak:"break-all"
                          }
                        },
                      }}
                    />
                  </Box>
                  <Box>
                    <ListItemText
                      primary="Validasi Tanggal"
                      secondary={dateFormat(value.validatedAt, { time: true })}
                      slotProps={{
                        primary: {
                          variant: "body2",
                          fontWeight: 700,
                          whiteSpace: "nowrap",
                        },
                        secondary: {
                          variant: "body2",
                          whiteSpace: "nowrap",
                        },
                      }}
                    />
                  </Box>

                  <Box>
                    <ListItemText
                      primary="Dibuat Tanggal"
                      secondary={dateFormat(value.createdAt, { time: true })}
                      slotProps={{
                        primary: {
                          variant: "body2",
                          fontWeight: 700,
                          whiteSpace: "nowrap",
                        },
                        secondary: {
                          variant: "body2",
                          whiteSpace: "nowrap",
                        },
                      }}
                    />
                  </Box>
                </Stack>

                <RoleComponent
                  permission={["admin", "operator"]}
                  then={
                    value.action === null ? (
                      <Stack direction={"row"} spacing={1}>
                        <div>
                          <Button
                            size="small"
                            color="error"
                            variant="outlined"
                            disableElevation
                            onClick={
                              onValidation
                                ? onValidation(value.id!, "rejected")
                                : undefined
                            }
                          >
                            Tolak
                          </Button>
                        </div>
                        <div>
                          <Button
                            size="small"
                            onClick={
                              onValidation
                                ? onValidation(value.id!, "approved")
                                : undefined
                            }
                            variant="outlined"
                            color="success"
                            disableElevation
                          >
                            Setujui
                          </Button>
                        </div>
                      </Stack>
                    ) : null
                  }
                  otherwise={
                    i === 0 && value.action === "rejected" ? (
                      <div>
                        <Button
                          variant="contained"
                          disableElevation
                          onClick={onResend}
                          size="small"
                        >
                          Pengajuan Ulang
                        </Button>
                      </div>
                    ) : null
                  }
                />
              </Stack>
            </Paper>
          </Collapse>
        ))}
      </TransitionGroup>
    </Stack>
  );
};

export default ValidationItem;
