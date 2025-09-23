"use client";

import { useAuth } from "@/views/contexts/AuthContext";
import { getCheck } from "@/views/services/user.service";
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
  const [business, setBusiness] = React.useState(false);
  const [service, setService] = React.useState(false);
  const [login, setLogin] = React.useState(false);

  const auth = useAuth()

  const onClick = () => {
    React.startTransition(() => {
      startProgress();
      if (login) {
        router.push("/account/business-profile");
      } else {
        router.push("/login");
      }
    });
  };

  React.useEffect(() => {
    getCheck().then((resp) => {
      setBusiness(resp.data.dontHaveBusiness);
      setService(resp.data.dontHaveService);
      setLogin(resp.data.login);
    });
  }, [auth.isAuth]);

  if (login && !business && !service) {
    return null;
  }

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
        <AlertTitle variant="subtitle1" fontWeight={900}>
          {login && (business || service)
            ? "Anda belum memiliki layanan jasa."
            : "Daftarkan Jasa Anda GRATIS!"}
        </AlertTitle>
        {login && (business || service) ? (
          <Typography variant="subtitle2">
            Tambahkan layanan Anda sekarang untuk mulai menjangkau lebih banyak
            pelanggan.
          </Typography>
        ) : (
          <Typography variant="subtitle2">
            Jangkau lebih banyak pelanggan dan kembangkan bisnis Anda tanpa
            biaya.
          </Typography>
        )}
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
