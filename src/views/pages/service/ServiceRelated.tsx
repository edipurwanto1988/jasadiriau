"use client";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import { useProgress } from "react-transition-progress";
import { serviceUrl } from "@/views/services/service.service";

import useSWR from "swr";
import Skeleton from "@mui/material/Skeleton";
import { rupiah } from "@/utils/format";
import React from "react";

type Props = {
  slug: string;
};

const ServiceRelated = ({ slug }: Props) => {
  const router = useRouter();
  const startProgress = useProgress();

  const { data, isLoading } = useSWR(`${serviceUrl.related}?slug=${slug}`, (url) =>
    fetch(url)
      .then((resp) => resp.json())
      .then((resp) => resp.data)
  );
  return (
    <Stack
      sx={{
        width: "100%",
        overflow: "hidden",
      }}
      mt={4}
      spacing={3}
    >
      <Box>
        <Typography fontWeight={500} fontSize={22} lineHeight={"28px"}>
          Jasa Lainya
        </Typography>
      </Box>

      <Stack
        direction={"row"}
        spacing={3}
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
                <Box>
                  <Skeleton width={"100%"} />
                </Box>
              </Stack>
            ))
          : (data ?? []).map((value, i) => (
              <Stack
                key={i}
                width={160}
                spacing={1}
                onClick={() => {
                  React.startTransition(() => {
                    startProgress();
                    router.push(`/jasa/${value.slug}`);
                  });
                }}
                sx={{ cursor: "pointer" }}
              >
                <Box
                  sx={{
                    overflow: "hidden",
                    borderRadius: "var(--mui-shape-borderRadius)",
                    position: "relative",
                    width: 160,
                    height: 160,
                    backgroundImage: `url(${value.image_url})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    aspectRatio: "1/1",
                  }}
                ></Box>
                <Box>
                  <Typography variant="subtitle2">
                    {value.category_name}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    lineHeight={"21px"}
                    fontWeight={400}
                    variant="subtitle2"
                    color="#4A739C"
                    alignSelf={"stretch"}
                  >
                    {value.name}
                  </Typography>
                </Box>

                <Box>
                  <Typography fontWeight={500} variant="subtitle2">
                    {rupiah(value.price)}
                  </Typography>
                </Box>
              </Stack>
            ))}
      </Stack>
    </Stack>
  );
};

export default ServiceRelated;
