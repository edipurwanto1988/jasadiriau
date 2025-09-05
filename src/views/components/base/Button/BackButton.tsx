"use client";
import ButtonWithIcon from "@/views/components/base/Button/ButtonWithIcon";
import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();
  return (
    <Box>
      <ButtonWithIcon
        icon="ArrowBackOutlinedIcon"
        position="start"
        onClick={router.back}
      >
        Kembali
      </ButtonWithIcon>
    </Box>
  );
};

export default BackButton;
