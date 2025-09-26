"use client";
import React from "react";
import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MuiDrawer from "@mui/material/Drawer";
import Loading from "@/views/components/base/Skeleton/Spinner";
import { styled } from "@mui/material/styles";
import ListItemButton from "@mui/material/ListItemButton";
import { useRouter } from "next/navigation";
import { useProgress } from "react-transition-progress";
import { useAuth } from "@/views/contexts/AuthContext";
import Divider from "@mui/material/Divider";
import RoleComponent from "../Role/RoleComponent";

const Close = React.lazy(() => import("@mui/icons-material/Close"));

const Drawer = styled(MuiDrawer)(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  "& .MuiDrawer-paper": {
    backgroundColor: "#FFF",
    color: theme.palette.text.secondary,
    position: "relative",
    whiteSpace: "nowrap",
    width: 240,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

type Props = {
  open: boolean;
  setting: { siteName?: string } | null;
  menu: any;
  onOpen: () => void;
};

const MainSidebarMenu = (props: Props) => {
  const auth = useAuth();
  const startProgress = useProgress();
  const router = useRouter();
  return (
    <Drawer
      container={() => document.body}
      variant={"temporary"}
      color="primary"
      open={props.open}
      onClose={props.onOpen}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: [1],

          height: {
            xs: 48,
          },
          minHeight: {
            xs: 48,
          },
        }}
      >
        <Typography sx={{ flexGrow: 1 }} align="center" fontWeight={500}>
          {props.setting?.siteName ?? "JasaDiRiau"}
        </Typography>
        <IconButton size="small" color="primary" onClick={props.onOpen}>
          <React.Suspense fallback={<Loading />}>
            <Close fontSize="small" />
          </React.Suspense>
        </IconButton>
      </Toolbar>

      <div>
        <List component={"div"} sx={{ px: 1 }}>
          {auth.isAuth ? (
            <>
              <ListItemButton
                onClick={() => {
                  React.startTransition(() => {
                    startProgress();
                    router.push(
                      auth.role === "user"
                        ? "/account/business-profile"
                        : "/admin"                    );
                    props.onOpen();
                  });
                }}
              >
                <Typography variant="subtitle2">Beranda</Typography>
              </ListItemButton>

              <RoleComponent
                permission={["user"]}
                then={
                  <>
                    <ListItemButton
                      onClick={() => {
                        React.startTransition(() => {
                          startProgress();
                          router.push("/account/business-profile", {
                            scroll: false,
                          });
                          props.onOpen();
                        });
                      }}
                    >
                      <Typography variant="subtitle2">Profil Bisnis</Typography>
                    </ListItemButton>

                    <ListItemButton
                      onClick={() => {
                        React.startTransition(() => {
                          startProgress();
                          router.push("/account/service");
                          props.onOpen();
                        });
                      }}
                    >
                      <Typography variant="subtitle2">Layanan</Typography>
                    </ListItemButton>
                  </>
                }
              />
              <Divider />
            </>
          ) : null}

          {(props.menu ?? []).map((val: any, i) => (
            <ListItemButton
              key={i}
              sx={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
              onClick={() => {
                React.startTransition(() => {
                  startProgress();
                  router.push(val.url);
                  props.onOpen();
                });
              }}
            >
              <Typography variant="subtitle2">{val.name}</Typography>
            </ListItemButton>
          ))}
        </List>
      </div>
    </Drawer>
  );
};

export default MainSidebarMenu;
