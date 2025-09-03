import type { Metadata } from "next";
import AdminLayout from "@/views/components/layouts/AdminLayout";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import { PlusJakartaSans } from "@/lib/plus-jakarta-sans.font";
import theme from "@/views/admin.theme";
import "./globals.css";
import { ProgressBar, ProgressBarProvider } from "react-transition-progress";

export const metadata: Metadata = {
  title: "Admin",
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
              <ProgressBar className="my-progressbar" />
              <AdminLayout>{children}</AdminLayout>
            </ThemeProvider>
          </AppRouterCacheProvider>
        </ProgressBarProvider>
      </body>
    </html>
  );
}
