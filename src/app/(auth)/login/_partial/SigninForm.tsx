"use client";
import InputPassword from "@/views/components/base/Input/InputPassword";
import LoadComponent from "@/views/components/base/LoadComponent/LoadComponent";
import InputAdornment from "@mui/material/InputAdornment";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React from "react";
import { signin } from "@/actions/auth.action";
import Fade from "@mui/material/Fade";
import FormHelperText from "@mui/material/FormHelperText";

const TextField = LoadComponent(() => import("@mui/material/TextField"));
const AlternateEmailIcon = LoadComponent(
  () => import("@mui/icons-material/Email")
);

export default function SigninForm() {
  const [state, action, pending] = React.useActionState(signin, undefined);

  return (
    <Stack
      direction={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      sx={{ marginTop: 8 }}
    >
      <Paper
        variant="outlined"
        sx={{
          p: 3,
          borderRadius: "var(--mui-shape-borderRadius)",
          width: 400,
          overflow: "hidden",
        }}
      >
        <Stack
          width={"100%"}
          direction={"column"}
          alignItems={"center"}
          spacing={3}
        >
          <Avatar sx={{ width: 56, height: 56 }} />
          <Box>
            <Typography
              fontWeight={700}
              variant="h6"
              align="center"
              lineHeight={1.25}
            >
              Jasa di Riau
            </Typography>
          </Box>

          <Box
            component={"form"}
            action={action}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              gap: 4,
            }}
          >
            <Stack direction={"column"} spacing={2.5} width={"100%"}>
              <Fade in={!!state?.message} unmountOnExit>
                <FormHelperText error>{state?.message}</FormHelperText>
              </Fade>

              <TextField
                id="email"
                name="email"
                type="email"
                placeholder="Masukkan email"
                variant="outlined"
                fullWidth
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <AlternateEmailIcon />
                      </InputAdornment>
                    ),
                  },
                }}
                error={!!state?.errors?.email}
                helperText={state?.errors?.email ?? ""}
              />

              <InputPassword
                variant="outlined"
                placeholder="Masukkan kata sandi"
                error={!!state?.errors?.password}
                helperText={state?.errors?.password ?? ""}
              />
            </Stack>

            <Button
              loading={pending}
              disabled={pending}
              variant="contained"
              disableElevation
              fullWidth
              type="submit"
            >
              Masuk
            </Button>
          </Box>

          <Link
            href="/"
            fontSize={"var(--plus-jakarta-sans)"}
            underline="none"
            variant="subtitle2"
            fontWeight={400}
          >
            Kembali
          </Link>
        </Stack>
      </Paper>
    </Stack>
  );
}
