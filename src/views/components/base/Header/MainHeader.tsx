import React from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import LoadComponent from "@/views/components/base/LoadComponent/LoadComponent";
import AuthMenuHeader from "./AuthMenuHeader";
import { Divider } from "@mui/material";
import HomeMenu from "../Menu/HomeMenu";
import { getHeader } from "@/actions/menu.action";
import { getSetting } from "@/actions/setting.action";

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
        <Toolbar sx={{ overflow: "hidden" }}>
          <Divider />
          <Stack
            flex={1}
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            px={2}
          >
            <Stack
              direction={"row"}
              justifyContent={"flex-start"}
              alignItems={"center"}
              spacing={2}
            >
              <Box>
                <Link
                  fontWeight={900}
                  fontSize={18}
                  href="/"
                  underline="none"
                  color="text.primary"
                  variant="subtitle1"
                >
                  {setting?.siteName ?? "JasadiRiau.com"}
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
                    <Link
                      variant="subtitle2"
                      href={v.url}
                      underline="none"
                      color="text.primary"
                    >
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
