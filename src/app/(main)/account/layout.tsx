import AlertDialog from "@/views/components/base/Dialog/AlertDialog";
import Snackbar from "@/views/components/base/Snackbar";
import AlertProvider from "@/views/contexts/AlertContext";
import SnackbarProvider from "@/views/contexts/SnackbarContext";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

export default function RootLayout({
  children,
  sidebar,
}: Readonly<{
  sidebar: React.ReactNode;
  children: React.ReactNode;
}>) {
  return (
    <AlertProvider>
      <SnackbarProvider>
        <Box
          id="main"
          component={"main"}
          sx={{
            display: "flex",
            flex: 1,
            height: "100vh",
            margin: 0,
            padding: 0,
          }}
        >
          {sidebar}
          <Box
            sx={{
              flexGrow: 1,
              backgroundColor: "#F5F5F5",
              height: "100vh",
              minHeight: "100vh",
              overflow: "hidden",
            }}
          >
            <Toolbar />
            {children}

            <Snackbar />
            <AlertDialog />
          </Box>
        </Box>
      </SnackbarProvider>
    </AlertProvider>
  );
}
