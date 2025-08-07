import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import type { Metadata } from "next";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/views/theme";
import AppLayout from "@/views/components/layouts/AppLayout";

export const metadata: Metadata = {
  title: "Admin",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppRouterCacheProvider options={{ key: "css", enableCssLayer: true }}>
      <ThemeProvider theme={theme}>
        <AppLayout>{children}</AppLayout>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
