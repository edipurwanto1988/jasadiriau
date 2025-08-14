import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import { PlusJakartaSans } from "@/lib/plus-jakarta-sans.font";
import theme from "@/views/public.theme";
import Toolbar from "@mui/material/Toolbar";
import "./globals.css";
import SnackbarProvider from "@/views/contexts/SnackbarContext";
import Snackbar from "@/views/components/base/Snackbar";

export const metadata: Metadata = {
  title: "Jasa di Riau",
};

export default async function Layout({
  children,
  header,
}: Readonly<{
  children: React.ReactNode;
  header: React.ReactNode;
}>) {
  return (
    <html lang="en" className={PlusJakartaSans.variable}>
      <head>
        <script
          src="https://accounts.google.com/gsi/client"
          async
          defer
        ></script>
      </head>
      <body>
        <AppRouterCacheProvider options={{ key: "css", enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            <SnackbarProvider>
              {header}
              <Toolbar />
              {children}
              <Snackbar/>
            </SnackbarProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
