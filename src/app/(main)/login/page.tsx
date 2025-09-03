import MainTemplate from "@/views/components/templates/MainTemplate";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import Register from "@/views/pages/auth/Register";
import Box from "@mui/material/Box";
import { getSetting } from "@/actions/setting.action";

export default async function Page() {
  const setting = await getSetting()
  return (
    <MainTemplate>
      <Toolbar/>
      <Stack alignItems={"center"} spacing={3}>
        <Avatar sx={{ width: 64, height: 64 }} />

        <Stack spacing={1} px={2}>
          <Typography
            align="center"
            fontWeight={700}
            lineHeight={1.5}
            fontSize={20}
          >
            Selamat datang di {setting?.siteName ?? 'JasaDiRiau'}
          </Typography>
          <Typography align="center" fontSize={16} fontWeight={400}>
            Login untuk mulai terhubung dengan penyedia jasa terpercaya di Riau.
          </Typography>
        </Stack>

        <Register />
        
        <Box sx={{px:2}}>
          <Typography variant="caption" align="center">
            Dengan melanjutkan, Anda menyetujui Syarat & Kebijakan Privasi kami.
          </Typography>
        </Box>
      </Stack>
    </MainTemplate>
  );
}
