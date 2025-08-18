"use client";
import React from "react";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import LoadComponent from "../LoadComponent/LoadComponent";
import IconButton from "@mui/material/IconButton";
import { Box } from "@mui/material";
import { signout } from "@/actions/auth.action";
import Dropdown from "../Dropdown/Dropdown";
import useRequest from "ezhooks/lib/useRequest";
import { getCurrent } from "@/views/services/user.service";

const NotificationsOutlinedIcon = LoadComponent(
  () => import("@mui/icons-material/NotificationsOutlined")
);

type Props = {
  isLogin?: boolean;
};

const AuthMenuHeader = ({ isLogin }: Props) => {
  const client = useRequest({
    data: {
      user: {
        name: "",
        imageUrl: undefined,
      },
    },
  });
  React.useEffect(() => {
    if (!isLogin) return;
    client.exec({
      service: getCurrent,
      onSuccess: (resp) => {
        return {
          user: resp.data,
        };
      },
    });

    return () => {
      client.cancel();
    };
  }, [isLogin]);

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
          <Box
            sx={{
              borderRadius: "var(--mui-shape-borderRadius)",
              backgroundColor: "var(--input-bg-color)",
              minWidth: 40,
              minHeight: 40,
            }}
          >
            <IconButton>
              <NotificationsOutlinedIcon />
            </IconButton>
          </Box>

          <Dropdown
            icon={
              <Avatar
                src={client.data.user.imageUrl}
                alt={client.data.user.name}
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
