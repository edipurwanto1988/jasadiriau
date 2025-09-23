import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import type { Metadata } from "next";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/views/public.theme";
import { PlusJakartaSans } from "@/lib/plus-jakarta-sans.font";
import "./globals.css";
import AuthProvider from "@/views/contexts/AuthContext";
import { getAuth } from "@/lib/auth";
import { ProgressBar, ProgressBarProvider } from "react-transition-progress";
import { getSetting } from "@/actions/setting.action";

export async function generateMetadata(): Promise<Metadata> {
  const setting = await getSetting();
  return {
    title: setting?.siteName,
    description: setting?.description,
    icons: {
      icon: "/icons/favicon.ico",
      shortcut: "/icons/favicon.ico",
      apple: "/icons/apple-touch-icon.png",
    },
  };
}

export default async function RootLayout({
  header,
  children,
  footer,
}: Readonly<{
  header: React.ReactNode;
  children: React.ReactNode;
  footer: React.ReactNode;
}>) {
  const auth = await getAuth();
  return (
    <html lang="en" className={PlusJakartaSans.variable}>
      <body className="main-body">
        <ProgressBarProvider>
          <AppRouterCacheProvider
            options={{ key: "css", enableCssLayer: true }}
          >
            <ThemeProvider theme={theme}>
              <AuthProvider initialState={auth}>
                <ProgressBar className="my-progressbar" />
                {header}
                {children}
                {footer}
              </AuthProvider>
            </ThemeProvider>
          </AppRouterCacheProvider>
        </ProgressBarProvider>
      </body>
    </html>
  );
}
