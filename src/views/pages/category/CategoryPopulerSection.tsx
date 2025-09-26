"use client";

import React from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { categoryUrl } from "@/views/services/category.service";
import useSWR from "swr";
import { Link } from "react-transition-progress/next";

const CategoryPopulerSection = () => {
  const { data, isLoading } = useSWR(categoryUrl.populer, (url) =>
    fetch(url)
      .then((resp) => resp.json())
      .then((resp) => resp.data)
  );
  return (
    <Stack
      sx={{
        p: 2,
        width: "100%",
      }}
      spacing={4}
    >
      <Box>
        <Typography
          fontWeight={700}
          fontSize={22}
          lineHeight={1.25}
          letterSpacing={"-0.015em"}
        >
          Kategori Jasa Populer
        </Typography>
      </Box>

      <Stack
        direction={"row"}
        alignItems={"stretch"}
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(2, 160px)",
            sm: "repeat(2, 160px)",
            md: "repeat(4, 160px)",
            lg: "repeat(5, 176px)",
            xl: "repeat(5, 176px)",
          },
          width: "100%",
          gap: {
            xs: "18px",
            sm: "18px",
            md: "18px",
            lg: "12px",
            xl: "12px",
          },
        }}
      >
        {isLoading
          ? [...Array(5)].map((_, i) => (
              <Stack
                key={i}
                flexShrink={0}
                width={160}
                spacing={2}
                sx={{ cursor: "pointer" }}
              >
                <Skeleton variant="rounded" width={160} height={160} />
                <Box>
                  <Skeleton width={"100%"} />
                </Box>
              </Stack>
            ))
          : (data ?? []).map((value, i) => (
              <Stack
                key={i}
                component={Link}
                href={`/category/${value.slug}`}
                flexShrink={0}
                width={160}
                spacing={2}
              >
                <Box
                  sx={{
                    overflow: "hidden",
                    borderRadius: "var(--mui-shape-borderRadius)",
                    position: "relative",
                    backgroundImage: `url(${value.imageUrl})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    aspectRatio: "1/1",
                    width: {
                      xs: "160px",
                      sm: "160px",
                      md: "160px",
                      lg: "176px",
                      xl: "176px",
                    },
                    height: {
                      xs: "160px",
                      sm: "160px",
                      md: "160px",
                      lg: "176px",
                      xl: "176px",
                    },
                  }}
                ></Box>
                <Box>
                  <Typography fontWeight={500}>{value.name}</Typography>
                </Box>
              </Stack>
            ))}
      </Stack>
    </Stack>
  );
};

export default CategoryPopulerSection;
