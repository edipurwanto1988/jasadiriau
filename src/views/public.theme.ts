"use client";

import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let theme = createTheme({
  cssVariables: true,
  typography: {
    fontFamily: "var(--font-plus-jakarta-sans)",
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
              color: "#4A739C",
              "&::placeholder": {
                color: "#4A739C",
                opacity: 1,
              },
            },
            "& .MuiOutlinedInput-root": {
              backgroundColor: "#E8EDF5",
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
