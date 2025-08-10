"use client";
import InputLargeSearch from "@/views/components/base/Input/InputLargeSearch";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const SectionSearch = () => {
  return (
    <Box
      sx={{
        width: "100%",
        overflow: "hidden",
        height: {
          xs: 256,
          sm: 256,
          md: 320,
          lg: 480,
          xl: 480,
        },
        p: 2,
      }}
    >
      <Stack
        justifyContent={"center"}
        sx={{
          position: "relative",
          height: "100%",
          width: "100%",
          backgroundImage:
            'linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuBKAn0ZszS_xxh7GkScT7vFBbh3O2b_d67oshZnytGyg3twfgvGZ9iLQv3eo9qd9XitAmbOgTWB2hxUwkZyKiEy1FJe65EGMTLPUqTS2IKF0RHwhuA78fC0DPkstqv-DG3_kglmToD30JFqU-cXQsjutM2Lvfb956F1krYJy0XPIr5kvVFZ9WVr4oGbqiLBh9Kc0yjsml0tY0sFiBP9mFSJs3-5_3MmZqoLnxVltelo6PsAScmiHcXBXI4pq4h49Ket4PLOkW_In8UF")',
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
          aspectRatio: "1/1",
          borderRadius: "var(--mui-shape-borderRadius)",
        }}
      >
        <Stack
          spacing={2}
          sx={{
            position: "absolute",
            bottom: {
              xs: 100,
              sm: 100,
              md: 100,
              lg: 128,
              xl: 128,
            },
            left: 48,
            right: 48,
          }}
        >
          <Box>
            <Typography
              fontWeight={800}
              color="white"
              sx={{
                fontSize: {
                  xs: 24,
                  sm: 28,
                  md: 28,
                  lg: 32,
                  xl: 32,
                },
              }}
            >
              Temukan Jasa Terbaik di Sekitar Anda
            </Typography>
          </Box>

          <Box>
            <Typography
              fontWeight={400}
              color="white"
              lineHeight={1.5}
              sx={(theme) => ({
                fontSize: 16,
                [theme.breakpoints.between("xs", "sm")]: {
                  fontSize: 12,
                },
                [theme.breakpoints.between("sm", "md")]: {
                  fontSize: 14,
                },
              })}
            >
              ServiceFinder menghubungkan Anda dengan penyedia jasa terpercaya
              untuk memenuhi semua kebutuhan Anda.
            </Typography>
          </Box>
        </Stack>

        <Paper
          elevation={0}
          sx={(theme) => ({
            position: "absolute",
            bottom: 48,
            left: 48,
            width: "60%",
            px: 1,
            py: 1,
            [theme.breakpoints.between("xs", "md")]: {
              bottom: 24,
              left: 0,
              width: "100%",
            },
          })}
        >
          <Stack direction={"row"} alignItems={"center"}>
            <InputLargeSearch
              sx={{
                backgroundColor: "transparent",
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#FFF",
                },
              }}
            />
            <Box>
              <Button
                size="large"
                disableElevation
                color="primary"
                variant="contained"
              >
                Cari
              </Button>
            </Box>
          </Stack>
        </Paper>
      </Stack>
    </Box>
  );
};

export default SectionSearch;
