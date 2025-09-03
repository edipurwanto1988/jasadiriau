"use client";
import React from "react";
import Box from "@mui/material/Box";
import LoadComponent from "@/views/components/base/LoadComponent/LoadComponent";
import IconButton from "@mui/material/IconButton";
import MainSidebarMenu from "../Sidebar/MainSidebarMenu";

const MenuIcon = LoadComponent(() => import("@mui/icons-material/Menu"));

type Props = {
  setting: { siteName?: string } | null;
  menu: any;
};
const DrawerMenu = ({ setting, menu }: Props) => {
  const [open, setOpen] = React.useState(false);

  const onOpen = () => {
    setOpen((p) => !p);
  };
  return (
    <Box
      sx={{
        display: {
          xs: "block",
          sm: "block",
          md: "none",
          xl: "none",
          lg: "none",
        },
      }}
    >
      <IconButton onClick={onOpen}>
        <MenuIcon />
      </IconButton>

      <MainSidebarMenu
        open={open}
        setting={setting}
        menu={menu}
        onOpen={onOpen}
      />
    </Box>
  );
};

export default DrawerMenu;
