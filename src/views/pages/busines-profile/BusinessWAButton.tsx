"use client";
import React from "react";
import ButtonWithIcon from "@/views/components/base/Button/ButtonWithIcon";
import Box from "@mui/material/Box";
import { postContact } from "@/views/services/interactive.service";

const BusinessWAButton = ({
  data,
  siteName,
}: {
  data: BusinessProfile;
  siteName: string | null;
}) => {
  return (
    <Box>
      {(data.businessContact ?? [])
        .filter((_, i) => i === 0)
        .map((v, i) => (
          <ButtonWithIcon
            key={i}
            disabled={!data.businessContact?.length}
            position="start"
            icon="WAIcon"
            variant="contained"
            fullWidth
            disableElevation
            size="large"
            sx={{
              backgroundColor: "var(--wa-color2)",
              whiteSpace: "nowrap",
            }}
            onClick={() => {
              const phone = v.whatsappNumber;
              const text = encodeURIComponent(
                `Halo, saya menemukan layanan *${data.businessName}* di ${siteName}.\n` +
                  `Saya ingin menanyakan lebih lanjut mengenai detail layanan tersebut.\n` +
                  `Apakah bisa dibantu?`
              );
              postContact({
                source: "detail",
                phoneNumber: v.whatsappNumber,
                contactId: v.id,
              });
              const url = `${process.env.NEXT_PUBLIC_WA_LINK}?phone=${phone}&text=${text}`;
              window.open(url, "_blank", "noopener,noreferrer");
            }}
          >
            Chat Via Whatsapp
          </ButtonWithIcon>
        ))}
    </Box>
  );
};

export default BusinessWAButton;
