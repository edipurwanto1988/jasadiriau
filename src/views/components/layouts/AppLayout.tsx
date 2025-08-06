import React from "react";
import Toolbar from "@mui/material/Toolbar";
import { ThemeProvider } from "@mui/material/styles";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import Header from "@/views/components/base/Header/HeaderMain";
import SidebarMenu from "@/views/components/base/Sidebar/SidebarMenu";
import theme from "@/views/theme";
import Box from "@mui/material/Box";
import AppProvider from "@/views/contexts/AppContext";
import Snackbar from "../base/Snackbar";
import SnackbarProvider from "@/views/contexts/SnackbarContext";
import AlertDialog from "../base/Dialog/AlertDialog";
import AlertProvider from "@/views/contexts/AlertContext";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppProvider>
      <AppRouterCacheProvider options={{ enableCssLayer: true, key: "css" }}>
        <ThemeProvider theme={theme}>
          <AlertProvider>
            <SnackbarProvider>
              <Box
                sx={{
                  display: "flex",
                  flex: 1,
                  height: "100vh",
                  margin: 0,
                  padding: 0,
                  overflow: "hidden",
                }}
              >
                <Header />
                <SidebarMenu />

                <Box
                  component={"main"}
                  id="main"
                  sx={{
                    backgroundColor: "#F5F5F5",
                    flexGrow: 1,
                    height: "100vh",
                    minHeight: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    overflow: "hidden",
                  }}
                >
                  <Toolbar sx={{ height: { xs: 48 }, minHeight: { xs: 48 } }} />
                  {children}
                </Box>
              </Box>

              <Snackbar />
            </SnackbarProvider>
            <AlertDialog />
          </AlertProvider>
        </ThemeProvider>
      </AppRouterCacheProvider>
    </AppProvider>
  );
}
