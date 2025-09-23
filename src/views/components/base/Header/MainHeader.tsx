import React from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import LoadComponent from "@/views/components/base/LoadComponent/LoadComponent";
import AuthMenuHeader from "./AuthMenuHeader";
import HomeMenu from "../Menu/HomeMenu";
import { getHeader } from "@/actions/menu.action";
import { getSetting } from "@/actions/setting.action";
import { Link } from "react-transition-progress/next";
import dynamic from "next/dynamic";
import Image from "next/image";

const DrawerMenu = dynamic(() => import("../Menu/DrawerMenu"));
const SearchIcon = LoadComponent(() => import("@mui/icons-material/Search"));

const MainHeader = async () => {
  const [setting, menus] = await Promise.all([getSetting(), getHeader()]);

  return (
    <AppBar
      elevation={0}
      color="inherit"
      position="fixed"
      sx={{
        borderBottom: 1,
        backgroundColor: "var(--bg-color)",
        borderColor: "divider",
        zIndex: "calc(var(--mui-zIndex-drawer) + 1)",
      }}
    >
      <Toolbar sx={{ overflow: "hidden", px: 1 }}>
        <Stack
          flex={1}
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          px={0}
        >
          <Stack
            direction={"row"}
            justifyContent={"flex-start"}
            alignItems={"center"}
            spacing={2}
          >
            <DrawerMenu setting={setting} menu={menus} />

            <Box sx={{ position: "relative", width: 40, height: 40 }}>
              <Image
                src={"/images/logo.png"}
                alt="logo"
                fill
                loading="lazy"
                sizes="100%"
              />
            </Box>
            <Box>
              <Link
                href="/"
                style={{
                  lineHeight: 1.57,
                  fontWeight: 900,
                  fontSize: 18,
                }}
                scroll={false}
              >
                {setting?.siteName ?? "JasaDiRiau"}
              </Link>
            </Box>

            <Stack
              direction={"row"}
              justifyContent={"flex-start"}
              alignItems={"center"}
              spacing={2}
              display={{
                xs: "none",
                sm: "none",
                md: "flex",
                lg: "flex",
                xl: "flex",
              }}
            >
              <HomeMenu />

              {menus.map((v) => (
                <Box key={v.id}>
                  <Link href={v.url} prefetch={false} scroll={false}>
                    {v.name}
                  </Link>
                </Box>
              ))}
            </Stack>
          </Stack>

          <Stack
            direction={"row"}
            justifyContent={"flex-end"}
            alignItems={"center"}
            spacing={4}
          >
            <Box
              component={"form"}
              noValidate
              action={"/search"}
              display={{
                xs: "none",
                sm: "none",
                md: "flex",
                lg: "flex",
                xl: "flex",
              }}
            >
              <TextField
                variant="outlined"
                type="search"
                name="q"
                placeholder="Search"
                slotProps={{
                  input: {
                    startAdornment: (
                      <SearchIcon htmlColor="#4A739C" sx={{ mr: 1 }} />
                    ),
                  },
                }}
                sx={{
                  width: 160,
                }}
              />
            </Box>

            <AuthMenuHeader />
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default MainHeader;
