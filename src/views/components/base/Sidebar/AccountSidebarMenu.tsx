"use client";
import React from "react";

import List from "@mui/material/List";
import { SvgIconTypeMap } from "@mui/material/SvgIcon";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import TooltipAccountSidebarMenu from "../Tooltip/TooltipAccountSidebarMenu";
import Toolbar from "@mui/material/Toolbar";

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

const AddBusinessOutlinedIcon = React.lazy(
  () => import("@mui/icons-material/AddBusinessOutlined")
);

const MiscellaneousServicesIcon = React.lazy(
  () => import("@mui/icons-material/MiscellaneousServices")
);

const menu: SiderBarMenu = [
  {
    path: "/account/business-profile",
    key: "business-profile",
    name: "Profil Bisnis",
    icon: AddBusinessOutlinedIcon,
  },
  {
    path: "/account/service",
    key: "service",
    name: "Layanan",
    icon: MiscellaneousServicesIcon,
  },
];

const drawerWidth = 240;

const AccountSidebarMenu = () => {
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
            <TooltipAccountSidebarMenu key={key} pathKey={key} {...val} />
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default AccountSidebarMenu;
