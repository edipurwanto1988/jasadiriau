"use client";
import React from "react";
import Typography from "@mui/material/Typography";
import { default as MuiLink } from "@mui/material/Link";
import {
  BreadcrumbsProps,
  default as MUIBreadcrumbs,
} from "@mui/material/Breadcrumbs";
import { snackCaseToWord } from "@/utils/string";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Box from "@mui/material/Box";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Breadcrumbs = () => {
  const pathname = usePathname();
  const render = (links: string) => {
    const paths = links.split("/");
    let url = "";

    const temp = paths.map((v) => {
      return (
        <MuiLink component={Link} href={url} fontSize={"small"}>
          {snackCaseToWord(v)}
        </MuiLink>
      );
    });

    return temp;
  };

  return (
    <Box
      role="presentation"
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      <MUIBreadcrumbs separator={"›"} maxItems={4} aria-label="breadcrumb">
        {render(pathname)}
      </MUIBreadcrumbs>
    </Box>
  );
};

export default Breadcrumbs;
