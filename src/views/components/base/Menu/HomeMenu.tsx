"use client";

import { useAuth } from "@/views/contexts/AuthContext";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";

const HomeMenu =  () => {
  const auth = useAuth();
  if (!auth.isAuth) {
    return null;
  }
  return (
    <Box>
      <Link
        variant="subtitle2"
        href={auth.role === "user" ? "/account/business-profile" : "/admin"}
        underline="none"
        color="text.primary"
      >
        Beranda
      </Link>
    </Box>
  );
};

export default HomeMenu;
