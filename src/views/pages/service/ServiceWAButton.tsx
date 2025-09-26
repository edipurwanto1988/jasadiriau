"use client";

import React from "react";
import Box from "@mui/material/Box";
import ButtonWithIcon from "@/views/components/base/Button/ButtonWithIcon";
import { useRouter } from "next/navigation";
import { getServiceBySlug } from "@/actions/service.action";
import { postContact } from "@/views/services/interactive.service";

type Props = {
  data: Awaited<ReturnType<typeof getServiceBySlug>>;
  siteName: string | null;
};

const ServiceWAButton = ({ data, siteName }: Props) => {
  const router = useRouter();

  return (
    <Box>
      {(data.businessProfile.BusinessContact ?? [])
        .filter((_, i) => i === 0)
        .map((v, i) => (
          <ButtonWithIcon
            key={i}
            icon="WAIcon"
            position="start"
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
                `Halo, saya menemukan layanan *${data.name}* di ${siteName}.\n` +
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

export default ServiceWAButton;
