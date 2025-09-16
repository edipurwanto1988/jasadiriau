"use client";
import React from "react";
import useMutation from "ezhooks/lib/useMutation";
import { postRegister } from "@/views/services/auth.service";
import { useSnackbar } from "@/views/contexts/SnackbarContext";
import Script from "next/script";
import { useProgress } from "react-transition-progress";

const Register = () => {
  const buttonRef = React.useRef<HTMLDivElement>(null);
  const startProgress = useProgress();
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
            React.startTransition(() => {
              startProgress();
              const timer = setTimeout(() => {
              window.location.href = "/"
                clearTimeout(timer);
              }, 500);
            });
          }
        },
      });
    }
  };

  // React.useEffect(() => {
  //   window.google?.accounts?.id?.initialize({
  //     client_id:
  //       "92261591557-raee5naceogcbfb1mhbddcu6nggt0685.apps.googleusercontent.com",
  //     callback: handleCredentialResponse,
  //     auto_select: true,
  //   });

  //   window.google?.accounts?.id?.renderButton(
  //     document.getElementById("google-signin"),
  //     {
  //       theme: "filled_blue",
  //       size: "large",
  //       shape: "pill",
  //       text: "signup_with",
  //       locale: "id",
  //     }
  //   );
  // }, []);

  return (
    <div>
      <div ref={buttonRef}></div>

      <Script
        src="https://accounts.google.com/gsi/client"
        async
        defer
        onLoad={() => {
          if (!window.google || !buttonRef.current) return;

          window.google.accounts.id.initialize({
            client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
            callback: handleCredentialResponse,
            auto_select: false,
          });

          window.google.accounts.id.renderButton(buttonRef.current, {
            theme: "filled_blue",
            size: "large",
            shape: "pill",
            text: "signup_with",
            locale: "id",
          });
        }}
      />
    </div>
  );
};

export default Register;
