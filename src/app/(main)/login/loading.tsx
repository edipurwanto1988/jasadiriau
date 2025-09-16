import MainTemplate from "@/views/components/templates/MainTemplate";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

export default function Loading() {
  return (
    <MainTemplate>
      <Toolbar />
      <Stack alignItems={"center"} spacing={3}>
        <Skeleton variant="circular" width={64} height={64} />

        <Stack spacing={1} px={2}>
          <Skeleton width={"80%"} />
          <Skeleton width={"80%"} />
        </Stack>

        <Skeleton width={"40%"} height={"24px"} />

        <Box sx={{ px: 2 }}>
          <Skeleton width={"80%"} />
        </Box>
      </Stack>
    </MainTemplate>
  );
}
