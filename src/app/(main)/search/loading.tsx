import React from "react";
import MainTemplate from "@/views/components/templates/MainTemplate";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";
import CardSearch from "@/views/pages/search/CardSearch";
import Box from "@mui/material/Box";

export default async function Loading() {
  return (
    <MainTemplate>
      <Stack direction={"column"} spacing={3}>
        <Skeleton width={"25%"} />
        <Skeleton width={"150%"} />

        <Stack direction={"row"} spacing={2}>
          <Skeleton width={"30%"} />
          <Skeleton width={"30%"} />
          <Skeleton width={"30%"} />
          <Skeleton width={"10%"} />
        </Stack>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(1, 1fr)",
              sm: "repeat(1, 1fr)",
              md: "repeat(2, 1fr)",
              lg: "repeat(4, 1fr)",
              xl: "repeat(4, 1fr)",
            },
            gap: "12px",
            width: "100%",
          }}
        >
          <CardSearch loading />
          <CardSearch loading />
          <CardSearch loading />
          <CardSearch loading />
        </Box>
      </Stack>
    </MainTemplate>
  );
}
