import React from "react";
import Toolbar from "@mui/material/Toolbar";
import Header from "@/views/components/base/Header/AdminHeader";
import SidebarMenu from "@/views/components/base/Sidebar/SidebarMenu";
import Box from "@mui/material/Box";
import AppProvider from "@/views/contexts/AppContext";
import Snackbar from "../base/Snackbar";
import SnackbarProvider from "@/views/contexts/SnackbarContext";
import AlertDialog from "../base/Dialog/AlertDialog";
import AlertProvider from "@/views/contexts/AlertContext";
import AuthProvider from "@/views/contexts/AuthContext";
import { getAuth } from "@/lib/auth";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const auth = await getAuth()
  return (
    <AppProvider>
      <AlertProvider>
        <SnackbarProvider>
         <AuthProvider initialState={auth}>
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
         </AuthProvider>
        </SnackbarProvider>
        <AlertDialog />
      </AlertProvider>
    </AppProvider>
  );
}
