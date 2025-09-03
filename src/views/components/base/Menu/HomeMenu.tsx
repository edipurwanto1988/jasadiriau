"use client";

import { useAuth } from "@/views/contexts/AuthContext";
import Box from "@mui/material/Box";
import { Link } from "react-transition-progress/next";

const HomeMenu = () => {
  const auth = useAuth();
  if (!auth.isAuth) {
    return null;
  }
  return (
    <Box>
      <Link
        href={auth.role === "user" ? "/account/business-profile" : "/admin"}
      >
        Beranda
      </Link>
    </Box>
  );
};

export default HomeMenu;
