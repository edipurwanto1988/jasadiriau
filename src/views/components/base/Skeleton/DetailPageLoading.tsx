import React from "react";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";

const DetailPageLoading = () => {
  return (
    <Stack
      flex={1}
      width={"100%"}
      height={"100vh"}
      minHeight={"100vh"}
      overflow={"hidden"}
      direction={"column"}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={1.5}
        sx={{
          overflow: "hidden",
          px: 2,
          boxSizing: "border-box",
          borderBottom: 1,
          borderColor: "var(--mui-palette-default-divider)",
          minHeight: "37px",
        }}
      >
        <Skeleton width={50} />
        <Skeleton width={100} />
        <div
          style={{ display: "flex", flexDirection: "row", gap: 8, flexGrow: 1 }}
        >
          <Skeleton width={50} />
          <Skeleton width={50} />
          <Skeleton width={50} />
        </div>

        <Skeleton width={100} />
      </Stack>

      <Stack direction={"column"} p={2} spacing={2}>
        <Stack direction={"row"} spacing={2}>
          <Skeleton variant="rounded" width={100} height={100} />

          <Stack direction={"column"}>
            <Skeleton width={240} />
            <Skeleton width={120} />
            <Skeleton width={60} />
          </Stack>
        </Stack>

        <Stack direction={"row"} spacing={2}>
          <Skeleton width={120} />
          <Skeleton width={120} />
          <Skeleton width={120} />
          <Skeleton width={120} />
        </Stack>

        <Skeleton width={"100%"} />
        <Skeleton width={"90%"} />
        <Skeleton width={"80%"} />
        <Skeleton width={"70%"} />
        <Skeleton width={"60%"} />
        <Skeleton width={"50%"} />
        <Skeleton width={"100%"} />
        <Skeleton width={"80%"} />
      </Stack>
    </Stack>
  );
};

export default DetailPageLoading;
