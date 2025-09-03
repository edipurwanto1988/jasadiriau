import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import ListItemText from "@mui/material/ListItemText";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import StatusChip from "@/views/components/base/Chip/StatusChip";
import LoadComponent from "@/views/components/base/LoadComponent/LoadComponent";

const MiscellaneousServicesIcon = LoadComponent(
  () => import("@mui/icons-material/MiscellaneousServicesOutlined")
);

type Props = {
  data: Service[];
  loading?: boolean;
};

const ServiceListCard = ({ loading, data }: Props) => {
  return (
    <Stack direction={"column"} py={2} spacing={2}>
      <Stack direction={"row"} alignItems={"center"} spacing={1}>
        <MiscellaneousServicesIcon />
        <Typography fontWeight={600}>Daftar Layanan</Typography>
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
        sx={{ width: "100%", flexWrap: "wrap", gap: "8px" }}
      >
        {data.map((value) => (
          <Paper
            variant="outlined"
            key={value.id}
            sx={{
              p: 1.5,
              flexBasis: {
                xs: "calc(100% - 8px)",
                sm: "calc(100% - 8px)",
                md: "calc(25% - 8px)",
                lg: "calc(25% - 8px)",
                xl: "calc(25% - 8px)",
              },
              maxWidth: {
                xs: "calc(100% - 8px)",
                sm: "calc(100% - 8px)",
                md: "calc(25% - 8px)",
                lg: "calc(25% - 8px)",
                xl: "calc(25% - 8px)",
              },
              boxSizing: "border-box",
              overflow: "hidden",
            }}
          >
            <Stack direction={"column"} spacing={0.5}>
              <ListItemText
                primary={
                  <Link href={`/account/service/${value.id}`} underline="none">
                    {value.name}
                  </Link>
                }
                secondary={value.categoryName}
                slotProps={{
                  primary: {
                    variant: "subtitle2",
                    letterSpacing: -0.5,
                  },
                  secondary: {
                    variant: "subtitle2",
                  },
                }}
              />
              <Typography variant="subtitle2" color="var(--blue-color)">
                {value.bussinessName}
              </Typography>

              <StatusChip status={value.status} icon />
            </Stack>
          </Paper>
        ))}
      </Stack>
    </Stack>
  );
};

export default ServiceListCard;
