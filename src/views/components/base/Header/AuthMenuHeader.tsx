"use client";
import React from "react";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import { signout } from "@/actions/auth.action";
import Dropdown from "../Dropdown/Dropdown";
import { userUrl } from "@/views/services/user.service";
import useSWR from "swr";
import { notifUrl } from "@/views/services/notifcation.service";
import HeaderNotification from "./HeaderNotification";
import { useAuth } from "@/views/contexts/AuthContext";

const AuthMenuHeader = () => {
  const auth = useAuth();
  const { data: dataUser } = useSWR<User>(
    auth.isAuth ? userUrl.current : null,
    (url) =>
      fetch(url)
        .then((resp) => resp.json())
        .then((resp) => resp.data)
  );

  const { data: dataNotif } = useSWR<INotification[]>(
    auth.isAuth ? notifUrl.index : null,
    (url) =>
      fetch(url)
        .then((resp) => resp.json())
        .then((resp) => resp.data),
    { refreshInterval: 5000 }
  );

  return (
    <Stack
      direction={"row"}
      spacing={2}
      sx={{
        alignItems: "center",
        "& .MuiButtonBase-root": {
          minHeight: 40,
          fontWeight: 700,
          fontSize: 14,
        },
      }}
    >
      {auth.isAuth ? (
        <>
          <HeaderNotification data={dataNotif} />

          <Dropdown
            icon={
              <Avatar
                src={dataUser?.imageUrl ?? ""}
                alt={dataUser?.name ?? ""}
                slotProps={{
                  img: {
                    referrerPolicy: "no-referrer",
                  },
                }}
              />
            }
            menu={[
              {
                text: "Logout",
                onClick: () => {
                  signout();
                },
              },
            ]}
          />
        </>
      ) : (
        <>
          {/* <div>
            <Button
              variant="contained"
              LinkComponent={"a"}
              href="register"
              disableElevation
            >
              Daftar
            </Button>
          </div> */}

          <div>
            <Button
              variant="contained"
              LinkComponent={"a"}
              href="login"
              // color="inherit"
              disableElevation
            >
              Masuk
            </Button>
          </div>
        </>
      )}
    </Stack>
  );
};

export default AuthMenuHeader;
