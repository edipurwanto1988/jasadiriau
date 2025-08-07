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
import { useApp } from "@/views/contexts/AppContext";
import Loading from "@/views/components/base/Skeleton/Spinner";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import TooltipSidebarMenu from "../Tooltip/TooltipSidebarMenu";

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
    path: "/admin/setting",
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
  const router = useRouter();
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
          {menu.map(({key,...val}, i) => (
            <TooltipSidebarMenu key={key} {...val} />
          ))}
        </List>
      </div>
    </Drawer>
  );
};

export default SidebarMenu;
