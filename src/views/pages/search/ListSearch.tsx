"use client";

import { commonUrl } from "@/views/services/common.service";
import useSWR from "swr";
import FilterSearch from "./FilterSearch";
import React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import Toolbar from "@mui/material/Toolbar";
import { useRouter, useSearchParams } from "next/navigation";
import CardSearch from "./CardSearch";
import Fade from "@mui/material/Fade";

const ListSearch = () => {
  const params = useSearchParams();
  const router = useRouter();
  const [url, setUrl] = React.useState(new URL(commonUrl.search));
  const [urlWithParam, setUrlWithParam] = React.useState(
    new URL(commonUrl.search)
  );

  const { data, isLoading } = useSWR<{ total: number; data: SearchList[] }>(
    url.toString(),
    (url) => fetch(url).then((resp) => resp.json()),
    {
      fallbackData: { total: 0, data: [] },
      // revalidateOnFocus: false,
      // revalidateIfStale: false,
      // revalidateOnReconnect: false,
    }
  );

  React.useEffect(() => {
    if (!params.toString()) return;
    const handler = setTimeout(() => {
      setUrl((p) => {
        p.search = params.toString();
        return new URL(p);
      });
    }, 500);

    if (urlWithParam.search) return;
    urlWithParam.search = params.toString();
    return () => {
      clearTimeout(handler);
    };
  }, [params.toString()]);

  const onSearch = () => {
    router.replace(urlWithParam.search, { scroll: false });
  };

  return (
    <Stack direction={"column"} spacing={4} minHeight={"100%"}>
      <FilterSearch
        url={urlWithParam}
        setUrl={setUrlWithParam}
        onSearch={onSearch}
      />

      <Fade
        in={!isLoading && !data?.data.length}
        unmountOnExit
        timeout={{ enter: 1000, exit: 0 }}
      >
        <Stack spacing={1}>
          <Typography align="center">Data Belum Tersedia</Typography>
        </Stack>
      </Fade>

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
        {isLoading ? (
          <>
            <CardSearch loading={isLoading} />
            <CardSearch loading={isLoading} />
            <CardSearch loading={isLoading} />
            <CardSearch loading={isLoading} />
          </>
        ) : (
          data?.data.map((value, i) => <CardSearch key={i} data={value} />)
        )}
      </Box>

      <Fade in={!!data?.data.length} unmountOnExit>
        <Stack direction={"row"} justifyContent={"center"}>
          <Pagination
            count={Math.ceil(data?.total ? data.total / 16 : 0)}
            variant="outlined"
            shape="rounded"
            page={+(url.searchParams.get("page") ?? 1)}
            onChange={(_, page) => {
              setUrlWithParam((p) => {
                p.searchParams.set("page", String(page));
                return new URL(p);
              });
            }}
            boundaryCount={2}
          />
        </Stack>
      </Fade>
    </Stack>
  );
};

export default ListSearch;
