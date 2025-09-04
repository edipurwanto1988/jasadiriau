import React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import LoadComponent from "@/views/components/base/LoadComponent/LoadComponent";
import Link from "@mui/material/Link";

const LanguageIcon = LoadComponent(
  () => import("@mui/icons-material/Language")
);

type Props = {
  url?: string | null;
  loading?: boolean;
};

const BusinessWebsiteItem = ({ url, loading }: Props) => {
  return (
    <Stack direction={"row"} alignItems={"center"} spacing={2}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          backgroundColor: "var(--input-bg-color)",
          p: 1,
          borderRadius: "var(--mui-shape-borderRadius)",
        }}
      >
        <LanguageIcon />
      </Box>
      <Box flexGrow={1}>
        <Typography>Kunjungi halaman situs kami</Typography>
      </Box>
      <Box>
        <Link
          variant="subtitle1"
          href={url}
          underline="none"
          target="_blank"
          sx={{
            display: "inline-block",
            backgroundColor: "var(--input-bg-color)",
            p: 0.5,
            textAlign: "center",
            color: "text.primary",
            minWidth: 84,
            borderRadius: "var(--mui-shape-borderRadius)",
          }}
        >
          Situs
        </Link>
      </Box>
    </Stack>
  );
};

export default BusinessWebsiteItem;
