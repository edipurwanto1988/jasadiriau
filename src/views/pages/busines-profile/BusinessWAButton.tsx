"use client";
import React from "react";
import ButtonWithIcon from "@/views/components/base/Button/ButtonWithIcon";
import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";

const BusinessWAButton = ({
  data,
  siteName,
}: {
  data: BusinessProfile;
  siteName: string | null;
}) => {
  const router = useRouter();

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
                `Halo, saya menemukan profil layanan Anda di ${siteName}.\nSaya ingin menanyakan lebih lanjut mengenai layanan yang tersedia.\nApakah bisa dibantu?`
              );
              router.push(
                `${process.env.NEXT_PUBLIC_WA_LINK}?phone=${phone}&text=${text}`
              );
            }}
          >
            Chat Via Whatsapp
          </ButtonWithIcon>
        ))}
    </Box>
  );
};

export default BusinessWAButton;
