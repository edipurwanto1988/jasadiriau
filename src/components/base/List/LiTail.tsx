import { styled } from "@mui/material/styles";

const LiTail = styled("li")(() => ({
  position: "relative",
  "&::before": {
    content: '""',
    position: "absolute",
    top: "10px",
    left: 0,
    bottom: "-10px",
    width: "1px",
    backgroundColor: "#aaa",
  },
  "&::after": {
    content: '""',
    position: "absolute",
    top: "10px",
    left: 0,
    bottom: 0,
    width: "20px",
    height: "1px",
    backgroundColor: "#aaa",
  },
  "&:last-child::before": {
    content: "unset",
  },
}));

export default LiTail;
