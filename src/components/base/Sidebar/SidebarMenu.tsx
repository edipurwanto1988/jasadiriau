"use client";
import React from "react";

import List from "@mui/material/List";
import { default as MUIListItemButton } from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SvgIcon, { SvgIconTypeMap } from "@mui/material/SvgIcon";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import MuiDrawer from "@mui/material/Drawer";

// import { useLocation, useNavigate } from "react-router";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import Collapse from "@mui/material/Collapse";
import { useApp } from "@/contexts/AppContext";
import Loading from "@/components/base/Skeleton/Spinner";
import { styled } from "@mui/material/styles";

export type SiderBarMenu = Array<{
  path?: string;
  key: string;
  name: string;
  icon?: React.LazyExoticComponent<
    OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
      muiName: string;
    }
  >;
  sub?: SiderBarMenu;
}>;

const ChevronLeft = React.lazy(() => import("@mui/icons-material/ChevronLeft"));

const Close = React.lazy(() => import("@mui/icons-material/Close"));

const DashboardIcon = React.lazy(() => import("@mui/icons-material/Dashboard"));

const ExpandMore = React.lazy(() => import("@mui/icons-material/ExpandMore"));

const SettingsOutlinedIcon = React.lazy(
  () => import("@mui/icons-material/SettingsOutlined")
);
const AddShoppingCartOutlinedIcon = React.lazy(
  () => import("@mui/icons-material/AddShoppingCartOutlined")
);

const LocalShippingOutlinedIcon = React.lazy(
  () => import("@mui/icons-material/LocalShippingOutlined")
);

const MapOutlinedIcon = React.lazy(
  () => import("@mui/icons-material/MapOutlined")
);

const Drawer = styled(MuiDrawer)(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    backgroundColor: "#F4F4F4",
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

const ListItemButton = styled(MUIListItemButton)(({}) => ({
  "&.Mui-selected": {
    backgroundColor: "rgba(255,255,255, 0.1)",
  },
}));

const menu: SiderBarMenu = [
  { path: "/", key: "dashboard", name: "Dashboard", icon: DashboardIcon },
  {
    path: "order",
    key: "order",
    name: "Pemesanan",
    icon: AddShoppingCartOutlinedIcon,
  },
  {
    path: "package",
    key: "package",
    name: "Paket",
    icon: LocalShippingOutlinedIcon,
  },
  {
    path: "trip",
    key: "trip",
    name: "Perjalanan",
    icon: MapOutlinedIcon,
  },
  {
    path: "setting",
    key: "setting",
    name: "Setting",
    icon: SettingsOutlinedIcon,
  },
];

const SidebarMenu = (props: any) => {
  const {
    trigger: { open, key },
    isMobile,
    onClickOpen,
    addKey,
    clearKey,
  } = useApp();

  const { window } = props;
  const container =
    window !== undefined ? () => window().document.body : undefined;

  const paths = React.useMemo<string[]>(
    () => [], //location.pathname.split("/").filter((v) => !!v),
    []
  );

  return (
    <Drawer
      id="sidebar"
      container={container}
      variant={isMobile ? "temporary" : "permanent"}
      color="primary"
      open={open}
      ModalProps={{
        keepMounted: isMobile, // Better open performance on mobile.
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: [1],
          borderBottom: 1,
          borderColor: "divider",
          height: {
            xs: 48,
          },
          minHeight: {
            xs: 48,
          },
        }}
      >
        <Typography sx={{ flexGrow: 1 }} align="center" fontWeight={500}>
          {open ? "Jasa Di Riau" : "JR"}
        </Typography>
        <IconButton
          size="small"
          color="primary"
          onClick={onClickOpen}
          sx={{ ...(!open ? { display: "none" } : undefined) }}
        >
          <React.Suspense fallback={<Loading />}>
            {isMobile ? (
              <Close fontSize="small" />
            ) : (
              <ChevronLeft fontSize="small" />
            )}
          </React.Suspense>
        </IconButton>
      </Toolbar>

      <div>
        <List component={"div"} sx={{ px: 1 }}>
          {menu.map((val, i) => (
            <Tooltip
              disableHoverListener={open}
              key={`${val.key}-${i}`}
              title={val.name}
              arrow
              placement="right"
            >
              <div>
                <ListItemButton
                  // sx={{ height: "36px" }}
                  selected={paths.includes(val.path || val.key)}
                  onClick={(e) => {
                    e.preventDefault();
                    if (val.path) {
                      clearKey();
                    } else {
                      addKey(val.key);
                      if (!open) {
                        onClickOpen();
                      }
                    }
                  }}
                >
                  {val.icon ? (
                    <ListItemIcon sx={{ minWidth: "36px" }}>
                      <React.Suspense fallback={<Loading />}>
                        <SvgIcon
                          id={`icon-${val.key}`}
                          fontSize={open ? "small" : "medium"}
                          component={val.icon}
                          sx={{
                            // color: "white",
                            ...(!open
                              ? {
                                  transform: "scale(1)",
                                  transition: "all .5s",
                                }
                              : {
                                  transform: "unset",
                                  transition: "all .5s",
                                }),
                          }}
                        />
                      </React.Suspense>
                    </ListItemIcon>
                  ) : null}
                </ListItemButton>
              </div>
            </Tooltip>
          ))}
        </List>
      </div>
    </Drawer>
  );
};

export default SidebarMenu;
