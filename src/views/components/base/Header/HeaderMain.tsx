"use client";

import React from "react";
// import { useAuth } from "@contexts/AuthContext";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import { styled } from "@mui/material/styles";
import Dropdown from "../Dropdown/Dropdown";
import Avatar from "@mui/material/Avatar";
import { useApp } from "@/views/contexts/AppContext";
// import { postLogout } from "@services/authService";
// import { useNavigate } from "react-router";

const MenuIcon = React.lazy(() => import("@mui/icons-material/Menu"));

export interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  width: `calc(100% - ${240 - 168}px)`,
  height: 48,
  color: theme.palette.text.secondary,
  overflow: "hidden",
  backgroundColor: "#F4F4F4",
  [theme.breakpoints.between("xs", "md")]: {
    width: `calc(100%)`,
  },
  [theme.breakpoints.up("lg")]: {
    zIndex: theme.zIndex.drawer,
  },
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: 240,
    width: `calc(100% - ${240}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const HeaderMain = () => {
  const app = useApp();
  // const auth = useAuth();
  // const navigate = useNavigate();

  // const handlLogout = () => {
  //   postLogout({}).then(() => {
  //     navigate("/login");
  //     localStorage.removeItem("token");
  //   });
  // };

  return (
    <AppBar
      id="appbar"
      component={"nav"}
      position="fixed"
      color="inherit"
      elevation={0}
    >
      <Toolbar
        sx={{
          pr: "24px", // keep right padding when drawer closed
          height: {
            xs: 48,
          },
          minHeight: {
            xs: 48,
          },
          gap: 2,
        }}
      >
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={app.onClickOpen}
          sx={{
            ...(app.isMobile
              ? undefined
              : app.trigger.open
              ? { display: "none" }
              : undefined),
          }}
        >
          <React.Suspense fallback={"loading..."}>
            <MenuIcon fontSize="inherit" color="primary" />
          </React.Suspense>
        </IconButton>

        <Box
          sx={{
            display: "flex",
            flexGrow: 0,
            ml: {
              xs: 0,
              sm: 0,
              md: 2,
              lg: 2,
              xl: 2,
            },
            gap: 1,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {/* <Fade in={!app.isMobile} unmountOnExit>
            <ListItemText
              primary={auth.user?.name}
              secondary={auth.user?.email}
              slotProps={{
                primary: {
                  textAlign: "right",
                  variant: "body2",
                },
                secondary: {
                  textAlign: "right",
                  variant: "caption",
                },
              }}
            />
          </Fade> */}
          <div>
            <Dropdown
              icon={<Avatar alt="img_profile" sx={{ width: 32, height: 32 }} />}
              buttonProps={{
                disableFocusRipple: true,
                disableTouchRipple: true,
                disableRipple: true,
              }}
              menu={[
                {
                  text: "Profil",
                },

                {
                  text: "Logout",
                  // onClick: handlLogout
                },
              ]}
            />
          </div>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderMain;
