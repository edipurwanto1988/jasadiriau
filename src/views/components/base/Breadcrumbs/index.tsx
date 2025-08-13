"use client";
import React from "react";
import { default as MuiLink } from "@mui/material/Link";
import { default as MUIBreadcrumbs } from "@mui/material/Breadcrumbs";
import { snackCaseToWord } from "@/utils/string";
import Box from "@mui/material/Box";
import Link from "next/link";
import Typography from "@mui/material/Typography";
import { usePathname } from "next/navigation";

const Breadcrumbs = () => {
  const pathname = usePathname();
  const render = (links: string) => {
    const paths = links.split("/");
    const lengthPath = paths.length;
    let url = String(process.env.NEXT_PUBLIC_BASE_URL);

    const temp = paths.map((v, i) => {
      if (i == 0) {
        url += `${v}`;

        return (
          <MuiLink
            component={Link}
            href={url}
            fontSize={"small"}
            underline="none"
          >
            Beranda
          </MuiLink>
        );
      } else if (i === lengthPath - 1) {
        return <Typography fontSize={"small"}>{snackCaseToWord(v)}</Typography>;
      }

      url += `/${v}`;
      return (
        <MuiLink
          component={Link}
          href={url}
          fontSize={"small"}
          underline="none"
        >
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
