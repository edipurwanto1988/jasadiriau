import React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import LoadComponent from "@/views/components/base/LoadComponent/LoadComponent";
import Link from "@mui/material/Link";

const WhatsAppIcon = LoadComponent(
  () => import("@mui/icons-material/WhatsApp")
);

type Props = {
  data: BusinessContact[];
};

const BusinessContactItem = ({ data }: Props) => {
  if (!data.length) {
    return null;
  }

  return data
    .filter((f) => !!f.whatsappNumber)
    .map((contact, i) => (
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
          <WhatsAppIcon />
        </Box>
        <Box flexGrow={1}>
          <Typography>Hubungi via WhatsApp</Typography>
        </Box>
        <Box>
          <Link
            variant="subtitle1"
            href={`https://wa.me/${
              contact.whatsappNumber
            }?text=${encodeURIComponent(
              "Hallo saya mau pesan jasa layanan anda"
            )}`}
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
            Chat
          </Link>
        </Box>
      </Stack>
    ));
};

export default BusinessContactItem;
