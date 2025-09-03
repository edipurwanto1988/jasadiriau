"use client";

import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let theme = createTheme({
  cssVariables: true,
  typography: {
    fontFamily: "var(--font-plus-jakarta-sans), sans-serif",
  },
  palette: {
    primary: {
      main: "#0D80F2",
    },
    text: {
      primary: "#0D141C",
    },
  },
  shape: {
    borderRadius: "8px",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "unset",
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        size: "small",
        slotProps: { inputLabel: { shrink: true } },
        variant: "standard",
      },
      variants: [
        {
          props: (props) => props.variant === "outlined",
          style: (theme) => ({
            "& .MuiInputBase-input": {
              color: "var(--blue-color)",
              minHeight: 40,
              "&::placeholder": {
                color: "var(--blue-color)",
                opacity: 1,
              },
            },
            "& .MuiOutlinedInput-root": {
              backgroundColor: "var(--input-bg-color)",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              border: "unset",
            },
          }),
        },
      ],
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
