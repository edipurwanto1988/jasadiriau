"use client";

import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let theme = createTheme({
  cssVariables: true,
  typography: {
    fontFamily: "var(--font-plus-jakarta-sans), sans-serif",
  },
  palette: {
    info:{
      main:"#c14144",
    },
    primary: {
      main: "#c14144",
    },
    text: {
      primary: "#333333",
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
    MuiTypography: {
      defaultProps: {
        color: "textPrimary"
      }
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
