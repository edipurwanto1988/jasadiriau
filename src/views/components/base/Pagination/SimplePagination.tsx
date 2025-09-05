"use client";

import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useRouter } from "next/navigation";
import { useProgress } from "react-transition-progress";

type Props = {
  total: number;
  page?: string;
};

const SimplePagination = ({ total, page }: Props) => {
  const startProgress = useProgress();
  const router = useRouter();

  if (total === 0) {
    return null;
  }

  return (
    <Stack direction={"row"} justifyContent={"center"}>
      <Pagination
        count={Math.ceil(total ? total / 25 : 0)}
        variant="outlined"
        shape="rounded"
        page={+(page ?? 1)}
        onChange={(_, page) => {
          React.startTransition(() => {
            startProgress();
            const params = new URLSearchParams(window.location.search);
            params.set("page", String(page));
            router.push(`?${params.toString()}`);
          });
        }}
        boundaryCount={2}
      />
    </Stack>
  );
};

export default SimplePagination;
