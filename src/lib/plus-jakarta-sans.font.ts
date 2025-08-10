
import localFont from "next/font/local";

export const PlusJakartaSans = localFont({
  src: [
    {
      path: "../../public/fonts/plus_jakarta_sans/PlusJakartaSans-VariableFont_wght.ttf",
      style: "normal",
      weight: "100 900",
    },
    {
      path: "../../public/fonts/plus_jakarta_sans/PlusJakartaSans-Italic-VariableFont_wght.ttf",
      style: "italic",
      weight: "100 900",
    },
  ],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});
