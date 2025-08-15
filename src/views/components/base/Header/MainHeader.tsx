import React from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import LoadComponent from "@/views/components/base/LoadComponent/LoadComponent";
import AuthMenuHeader from "./AuthMenuHeader";

const SearchIcon = LoadComponent(() => import("@mui/icons-material/Search"));

type Props = {
  isLogin?: boolean;
};

const MainHeader = ({ isLogin }: Props) => {
  return (
    <header>
      <AppBar
        elevation={0}
        color="inherit"
        sx={{ borderBottom: 1, borderColor: "divider" }}
      >
        <Toolbar sx={{ overflow: "hidden" }}>
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
                  href=""
                  underline="none"
                  color="text.primary"
                  variant="subtitle1"
                >
                  Jasa di Riau
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
                <Box>
                  <Link
                    variant="subtitle2"
                    href=""
                    underline="none"
                    color="text.primary"
                  >
                    Beranda
                  </Link>
                </Box>

                <Box>
                  <Link
                    variant="subtitle2"
                    href="category"
                    underline="none"
                    color="text.primary"
                  >
                    Kategori
                  </Link>
                </Box>

                <Box>
                  <Link
                    variant="subtitle2"
                    href=""
                    underline="none"
                    color="text.primary"
                  >
                    Penyedia Jasa
                  </Link>
                </Box>

                <Box>
                  <Link
                    variant="subtitle2"
                    href=""
                    underline="none"
                    color="text.primary"
                  >
                    Tentang Kami
                  </Link>
                </Box>
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

              <AuthMenuHeader isLogin={isLogin} />
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>
    </header>
  );
};

export default MainHeader;
