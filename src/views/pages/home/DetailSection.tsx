import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const DetailSection = () => {
  return (
    <Stack
      sx={{
        p: 2,
        width: "100%",
      }}
      spacing={2}
    >
      <Box>
        <Typography fontWeight={500} fontSize={22} lineHeight={"28px"}>
          Apa itu JasaDiriau.com?
        </Typography>
      </Box>

       <Box>
        <Typography variant="subtitle2">
         JasaDiriau.com adalah platform pencarian dan penyediaan jasa terpercaya
        di Riau. Kami membantu pengguna menemukan layanan sesuai kebutuhan
        dengan cepat, aman, dan transparan. Untuk memberikan pengalaman terbaik,
        kami mungkin meminta akses ke data dasar pengguna seperti email untuk
        keperluan login dan komunikasi.
        </Typography>
      </Box>
      
    </Stack>
  );
};

export default DetailSection;
