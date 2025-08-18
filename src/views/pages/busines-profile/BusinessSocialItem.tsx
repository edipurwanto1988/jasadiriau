import React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Image from "next/image";
import Link from "@mui/material/Link";
import { ucwords } from "@/utils/string";

type Props = {
  data: BusinessSocial[];
};

const BusinessSocialItem = ({ data }: Props) => {
  if (!data.length) {
    return null;
  }
  return data
    .filter((f) => !!f.url)
    .map((social, i) => (
      <Stack key={i} direction={"row"} alignItems={"center"} spacing={2}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: "var(--input-bg-color)",
            p: 1,
            borderRadius: "var(--mui-shape-borderRadius)",
          }}
        >
          <Image
            src={`/icons/${social.platform}.svg`}
            alt={social.platform}
            width={24}
            height={24}
            loading="lazy"
          />
        </Box>
        <Box flexGrow={1}>
          <Typography>Ikuti kami di {ucwords(social.platform)}</Typography>
        </Box>
        <Box>
          <Link
            variant="subtitle1"
            href={social.url}
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
            Ikuti
          </Link>
        </Box>
      </Stack>
    ));
};

export default BusinessSocialItem;
