import MainTemplate from "@/views/components/templates/MainTemplate";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Register from "./_partial/Register";

export default function Page() {
  return (
    <MainTemplate>
      <Stack alignItems={"center"} spacing={3}>
        <Avatar sx={{ width: 64, height: 64 }} />

        <Stack spacing={1}>
          <Typography
            align="center"
            fontWeight={700}
            lineHeight={1.5}
            fontSize={24}
          >
            Selamat datang di JasadiRiau
          </Typography>
          <Typography align="center" fontWeight={400}>
            Login untuk mulai terhubung dengan penyedia jasa terpercaya di Riau.
          </Typography>
        </Stack>

        <Register />
        <div>
          <Typography variant="caption">
            Dengan melanjutkan, Anda menyetujui Syarat & Kebijakan Privasi kami.
          </Typography>
        </div>
      </Stack>
    </MainTemplate>
  );
}
