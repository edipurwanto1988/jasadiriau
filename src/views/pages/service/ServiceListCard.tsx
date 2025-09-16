import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import ListItemText from "@mui/material/ListItemText";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import StatusChip from "@/views/components/base/Chip/StatusChip";
import LoadComponent from "@/views/components/base/LoadComponent/LoadComponent";
import { Link } from "react-transition-progress/next";
import CategoryChip from "@/views/components/base/Chip/CategoryChip";
import { rupiah } from "@/utils/format";

const MiscellaneousServicesIcon = LoadComponent(
  () => import("@mui/icons-material/MiscellaneousServicesOutlined")
);

type Props = {
  data: Service[];
  loading?: boolean;
  isGuest?: boolean;
};

const ServiceListCard = ({ isGuest, loading, data }: Props) => {
  return (
    <Stack direction={"column"} py={2} spacing={3}>
      <Stack direction={"row"} alignItems={"center"} spacing={1}>
        {/* <MiscellaneousServicesIcon /> */}
        <Typography fontWeight={700} fontSize={22}>
          Daftar Layanan
        </Typography>
      </Stack>

      <Fade in={loading} unmountOnExit>
        <Stack direction={"row"} justifyContent={"space-between"} spacing={2}>
          <Skeleton width={"100%"} />
          <Skeleton width={"100%"} />
          <Skeleton width={"100%"} />
          <Skeleton width={"100%"} />
        </Stack>
      </Fade>

      <Fade in={!data.length && !loading} unmountOnExit>
        <Box>
          <Typography>Belum ada daftar layanan.</Typography>
        </Box>
      </Fade>

      <Stack
        direction={"row"}
        sx={{ width: "100%", flexWrap: "wrap", gap: "12px" }}
      >
        {data.map((value) => (
          <Paper
            variant="outlined"
            key={value.id}
            sx={{
              p: 1.5,
              display: "flex",
              flexDirection: "column",
              flexBasis: {
                xs: "100%",
                sm: "100%",
                md: "calc(33% - 12px)",
                lg: "calc(33% - 12px)",
                xl: "calc(33% - 12px)",
              },
              maxWidth: {
                xs: "100%",
                sm: "100%",
                md: "calc(33% - 12px)",
                lg: "calc(33% - 12px)",
                xl: "calc(33% - 12px)",
              },
              boxSizing: "border-box",
              overflow: "hidden",
            }}
          >
            <Box flexGrow={1} overflow={"hidden"}>
              <Stack direction={"column"} spacing={1}>
                <ListItemText
                  primary={
                    <Link
                      href={
                        isGuest ? `/jasa/${value.slug}` : `/service/${value.id}`
                      }
                      prefetch={false}
                      scroll={false}
                      style={{ color: "var(--blue-color)", fontSize: "16px" }}
                    >
                      {value.name}
                    </Link>
                  }
                  slotProps={{
                    primary: {
                      variant: "subtitle2",
                      letterSpacing: -0.5,
                    },
                  }}
                />

                <CategoryChip label={value.categoryName} />

                {isGuest ? null : (
                  <Typography variant="subtitle2" color="var(--blue-color)">
                    {value.bussinessName}
                  </Typography>
                )}

                {isGuest ? null : <StatusChip status={value.status} icon />}
              </Stack>
            </Box>

            <Stack direction={"row"} justifyContent={"flex-end"} spacing={0.5}>
              {loading ? (
                <Skeleton width={"50%"} />
              ) : (
                <Typography variant="subtitle1">
                  {rupiah(value.price)}
                </Typography>
              )}
            </Stack>
          </Paper>
        ))}
      </Stack>
    </Stack>
  );
};

export default ServiceListCard;
