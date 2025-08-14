"use client";
import React from "react";
import { decodeJwtResponse } from "@/utils/string";
import MainTemplate from "@/views/components/templates/MainTemplate";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import useMutation from "ezhooks/lib/useMutation";
import { postRegister } from "@/views/services/auth.service";
import { redirect } from "next/navigation";
import { useSnackbar } from "@/views/contexts/SnackbarContext";

export default function Page() {
  const [loading, setLoading] = React.useState(true);
  const openSnackbar = useSnackbar();
  const mutation = useMutation({
    defaultValue: {
      credential: "",
    },
  });

  const handleCredentialResponse = (response) => {
    if (response.credential) {
      mutation.send({
        data: {
          credential: response.credential,
        },
        service: postRegister,
        onSuccess: (resp) => {
          if (resp.isLogin) {
            openSnackbar("Login kamu berhasil", { severity: "success" });
            const timer = setTimeout(() => {
              redirect("/");
              clearTimeout(timer);
            }, 1500);
          }
        },
      });
    }
  };

  React.useEffect(() => {
    if (typeof window === "undefined" && !(window as any).google) return;

    window.google?.accounts?.id?.initialize({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse,
      auto_select: true,
    });

    window.google?.accounts?.id?.renderButton(
      document.getElementById("google-signin"),
      {
        theme: "filled_blue",
        size: "large",
        shape: "pill",
        text: "signup_with",
        locale: "id",
      }
    );
    setLoading(false);
  }, [loading]);

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

        {loading ? (
          <Typography variant="caption">Loading goole login...</Typography>
        ) : (
          <div id="google-signin"></div>
        )}
      </Stack>
    </MainTemplate>
  );
}
