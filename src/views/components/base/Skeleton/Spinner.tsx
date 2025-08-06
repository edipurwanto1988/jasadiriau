'use client'
import { styled } from "@mui/material/styles";

const Spinner = styled("div")(({ theme }) => ({
  width: "16px",
  height: "16px",
  border: "2px solid",
  borderColor: `${theme.palette.grey[300]}`,
  borderTopColor: `${theme.palette.grey[700]}`,
  borderRadius: "50%",
  animation: "spin 1s linear infinite",
  "@keyframes spin": {
    "0%": { transform: "rotate(0deg)" },
    "100%": { transform: "rotate(360deg)" },
  },
}));

export default function Loading() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <Spinner />
    </div>
  );
}
