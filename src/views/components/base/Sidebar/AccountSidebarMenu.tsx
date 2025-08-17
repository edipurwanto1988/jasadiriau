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
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";

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

const AddBusinessOutlinedIcon = React.lazy(
  () => import("@mui/icons-material/AddBusinessOutlined")
);

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

const ListItemButton = styled(MUIListItemButton)(({}) => ({
  "&.Mui-selected": {
    backgroundColor: "rgba(255,255,255, 0.1)",
  },
}));

const menu: SiderBarMenu = [
  { path: "/admin", key: "dashboard", name: "Dashboard", icon: DashboardIcon },
  {
    path: "/admin/business-profile",
    key: "business-profile",
    name: "Profil Bisnis",
    icon: AddBusinessOutlinedIcon,
  },
  {
    path: "/admin/setting",
    key: "setting",
    name: "Setting",
    icon: SettingsOutlinedIcon,
  },
];

const drawerWidth = 240;

const AccountSidebarMenu = () => {
  const router = useRouter();

  return (
    <Drawer
      variant={"permanent"}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
        "& .MuiPaper-root": {
          backgroundColor: "var(--bg-color)",
        },
      }}
    >
      <Toolbar />

      <Box sx={{ overflow: "auto" }}>
        <List component={"div"} sx={{ px: 1 }}>
          {menu.map(({ key, ...val }, i) => (
            <TooltipSidebarMenu key={key} {...val} />
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default AccountSidebarMenu;
