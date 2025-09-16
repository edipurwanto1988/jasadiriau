"use client";
import React from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { categoryUrl } from "@/views/services/category.service";
import useSWR from "swr";
import Link from "next/link";

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
        gap={"12px"}
        sx={{
          flex: 1,
          flexWrap: "nowrap",
          width: "100%",
          overflow: "auto hidden",
          pb: 2,
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
                href={`/category/${value.slug}`}
                component={Link}
                flexShrink={0}
                width={160}
                spacing={2}
              >
                <Box
                  sx={{
                    overflow: "hidden",
                    borderRadius: "var(--mui-shape-borderRadius)",
                    position: "relative",
                    width: 160,
                    height: 160,
                    backgroundImage: `url(${value.imageUrl})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    aspectRatio: "1/1",
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
