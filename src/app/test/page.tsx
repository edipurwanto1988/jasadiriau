import Header from "@/components/base/headers/header";
import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import styles from './page.module.css'

export default async function Page() {
  return (
    <>
      <section className={styles.section}>
        <Box
          sx={{
            overflow: "hidden",
            background:
              "linear-gradient(45deg, #be105e 0%, #af2163 25%, #44a3b8 75%, #44a3b8 100%)",
          }}
        >
          <Toolbar />

          <Stack
            spacing={4}
            sx={{
              margin: "48px auto",
              width: "60%",
            }}
          >
            <Typography variant="h4" align="center" color="white">
              Temukan penyedia jasa terpercaya untuk <br />
              segala kebutuhan Anda
            </Typography>

            <Stack
              direction={"row"}
              justifyContent={"flex-start"}
              alignItems={"center"}
              component={Paper}
              elevation={0}
              p={2}
              spacing={1}
            >
              <TextField variant="outlined" fullWidth />
              <div>
                <Button
                  variant="contained"
                  disableElevation
                  sx={{
                    whiteSpace: "nowrap",
                    backgroundColor: "#b02463",
                    height: "56px",
                  }}
                  size="large"
                >
                  Temukan Jasa
                </Button>
              </div>
            </Stack>
          </Stack>
        </Box>
      </section>

      <section className={styles.section}>
        <Paper sx={{p:2, margin: "0px auto", width: "80%" }}>
          <Stack direction={"column"}>
            <div>
              <Typography variant="h6">Kategori Pilihan</Typography>
            </div>
          </Stack>
        </Paper>
      </section>
    </>
  );
}
