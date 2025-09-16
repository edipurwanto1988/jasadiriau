import Box from "@mui/material/Box";
import InputSearch from "./InputSearch";
import { getSlider } from "@/actions/slider.action";
import dynamic from "next/dynamic";

const Slider = dynamic(() => import("./SliderImage"));

const SearchSection = async () => {
  const images = await getSlider();
  return (
    <Box
      sx={{
        width: "100%",
        overflow: "hidden",
        position: "relative",
        height: {
          xs: 216,
          sm: 256,
          md: 320,
          lg: 480,
          xl: 480,
        },
        minHeight: {
          xs: 216,
          sm: 256,
          md: 320,
          lg: 480,
          xl: 480,
        },
        mx: {
          xs: 0,
          sm: 0,
          md: 2,
          lg: 2,
          xl: 2,
        },

        borderRadius: {
          xs: 0,
          sm: 0,
          md: "var(--mui-shape-borderRadius)",
          lg: "var(--mui-shape-borderRadius)",
          xl: "var(--mui-shape-borderRadius)",
        },
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.015) 0%, rgba(0, 0, 0, 0.1) 100%)`,
      }}
    >
      <Slider images={images} />
      <InputSearch />
    </Box>
  );
};

export default SearchSection;
