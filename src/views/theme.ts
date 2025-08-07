"use client";

import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let theme = createTheme({
  cssVariables: true,
  typography: {
    fontFamily: "var(--font-inter)",
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
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
