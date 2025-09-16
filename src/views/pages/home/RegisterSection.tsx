"use client";

import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import React from "react";
import { useProgress } from "react-transition-progress";

const RegisterSection = () => {
  const router = useRouter();
  const startProgress = useProgress();

  const onClick = () => {
    React.startTransition(() => {
      startProgress();
      router.push("/login");
    });
  };

  return (
    <Stack
      direction={{
        xs: "column",
        sm: "column",
        md: "row",
        lg: "row",
        xl: "row",
      }}
      justifyContent={"center"}
      sx={{
        py: 3,
        pl: {
          xs: 2,
          sm: 2,
          md: 4,
          lg: 4,
          xl: 4,
        },
        pr: {
          xs: 2,
          sm: 2,
          md: 0,
          lg: 0,
          xl: 0,
        },

        width: "100%",
      }}
      spacing={2}
    >
      <Alert
        action={
          <Button
            sx={{
              display: {
                xs: "none",
                sm: "none",
                md: "block",
                lg: "block",
                xl: "block",
              },
            }}
            variant="contained"
            size="large"
            disableElevation
            onClick={onClick}
          >
            Pasang Jasa Sekarang
          </Button>
        }
        icon={false}
        severity="info"
        variant="outlined"
        sx={{
          width: "100%",
          "& .MuiAlert-action": {
            p: 0,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          },
        }}
      >
        <AlertTitle variant="h6" fontWeight={900}>
          Daftarkan Jasa Anda GRATIS!
        </AlertTitle>
        <Typography variant="subtitle2">
          Jangkau lebih banyak pelanggan dan kembangkan bisnis Anda tanpa biaya.
        </Typography>
      </Alert>

      <Button
        sx={{
          display: {
            xs: "block",
            sm: "block",
            md: "none",
            lg: "none",
            xl: "none",
          },
        }}
        variant="contained"
        size="large"
        disableElevation
         onClick={onClick}
      >
        Pasang Jasa Sekarang
      </Button>
    </Stack>
  );
};

export default RegisterSection;
