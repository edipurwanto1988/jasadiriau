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

type Props = {
  isLogin?: boolean;
};

const AuthMenuHeader = ({ isLogin }: Props) => {
  const { data: dataUser } = useSWR<User>(
    isLogin ? userUrl.current : null,
    (url) =>
      fetch(url)
        .then((resp) => resp.json())
        .then((resp) => resp.data)
  );

  const { data: dataNotif } = useSWR<INotification[]>(
    isLogin ? notifUrl.index : null,
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
      {isLogin ? (
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
