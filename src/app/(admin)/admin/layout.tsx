import type { Metadata } from "next";
import AdminLayout from "@/views/components/layouts/AdminLayout";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import { PlusJakartaSans } from "@/lib/plus-jakarta-sans.font";
import theme from "@/views/admin.theme";
import './globals.css'

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
        <AppRouterCacheProvider options={{ key: "css", enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            <AdminLayout>{children}</AdminLayout>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
