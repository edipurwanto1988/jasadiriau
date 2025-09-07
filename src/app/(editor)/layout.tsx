import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import { PlusJakartaSans } from "@/lib/plus-jakarta-sans.font";
import theme from "@/views/admin.theme";
import "./globals.css";
import { ProgressBar, ProgressBarProvider } from "react-transition-progress";
import AlertProvider from "@/views/contexts/AlertContext";
import SnackbarProvider from "@/views/contexts/SnackbarContext";
import AlertDialog from "@/views/components/base/Dialog/AlertDialog";
import Snackbar from "@/views/components/base/Snackbar";

export const metadata: Metadata = {
  title: "Editor",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={PlusJakartaSans.variable}>
      <body>
        <ProgressBarProvider>
          <AppRouterCacheProvider
            options={{ key: "css", enableCssLayer: true }}
          >
            <ThemeProvider theme={theme}>
              <AlertProvider>
                <SnackbarProvider>
                  <ProgressBar className="my-progressbar" />
                  {children}
                  <AlertDialog />
                  <Snackbar />
                </SnackbarProvider>
              </AlertProvider>
            </ThemeProvider>
          </AppRouterCacheProvider>
        </ProgressBarProvider>
      </body>
    </html>
  );
}
