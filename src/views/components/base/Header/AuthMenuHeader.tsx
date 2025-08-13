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

const NotificationsOutlinedIcon = LoadComponent(
  () => import("@mui/icons-material/NotificationsOutlined")
);

type Props = {
  isLogin?: boolean;
};

const AuthMenuHeader = ({ isLogin }: Props) => {
  return (
    <Stack
      direction={"row"}
      spacing={3}
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
            icon={<Avatar />}
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
          <div>
            <Button
              variant="contained"
              LinkComponent={"a"}
              href="register"
              disableElevation
            >
              Daftar
            </Button>
          </div>

          <div>
            <Button
              variant="contained"
              LinkComponent={"a"}
              href="login"
              color="inherit"
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
