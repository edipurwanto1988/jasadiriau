import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const MainFooter = () => {
  return (
    <Box sx={{ px: 20}}>
      <Toolbar />
      <Stack spacing={3}>
        <Stack
          direction={"row"}
          justifyContent={"space-around"}
          alignItems={"center"}
        >
          <Link
            href="#"
            align="center"
            fontWeight={400}
            color="#4A739C"
            lineHeight="24px"
            fontFamily={"var(--font-plus-jakarta-sans)"}
            underline="none"
          >
            Tentang Kami
          </Link>
          <Link
            href="#"
            align="center"
            fontWeight={400}
            color="#4A739C"
            lineHeight="24px"
            fontFamily={"var(--font-plus-jakarta-sans)"}
            underline="none"
          >
            {" "}
            Tentang Kami
          </Link>
          <Link
            href="#"
            align="center"
            fontWeight={400}
            color="#4A739C"
            lineHeight="24px"
            fontFamily={"var(--font-plus-jakarta-sans)"}
            underline="none"
          >
            {" "}
            Tentang Kami
          </Link>
          <Link
            href="#"
            align="center"
            fontWeight={400}
            color="#4A739C"
            lineHeight="24px"
            fontFamily={"var(--font-plus-jakarta-sans)"}
          >
            {" "}
            Tentang Kami
          </Link>
        </Stack>
        <Stack></Stack>
        <Box>
          <Typography
            fontWeight={400}
            color="#4A739C"
            lineHeight="24px"
            align="center"
          >
            © 2024 ServiceFinder. All rights reserved.
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default MainFooter;
