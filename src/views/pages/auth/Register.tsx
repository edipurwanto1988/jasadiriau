"use client";
import React from "react";
import Typography from "@mui/material/Typography";
import useMutation from "ezhooks/lib/useMutation";
import { postRegister } from "@/views/services/auth.service";
import { useSnackbar } from "@/views/contexts/SnackbarContext";
import Fade from "@mui/material/Fade";
import { useRouter } from "next/navigation";

const Register = () => {
  const router = useRouter();
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
              router.push("/");
              router.refresh();
              clearTimeout(timer);
            }, 500);
          }
        },
      });
    }
  };

  React.useEffect(() => {
    window.google?.accounts?.id?.initialize({
      client_id:
        "92261591557-raee5naceogcbfb1mhbddcu6nggt0685.apps.googleusercontent.com",
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
  }, []);

  return (
    <>
      <Fade in={loading} unmountOnExit>
        <Typography variant="caption">Loading goole login...</Typography>
      </Fade>
      <div id="google-signin" />
    </>
  );
};

export default Register;
