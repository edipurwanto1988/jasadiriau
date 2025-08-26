import Box from "@mui/material/Box";
import "react-multi-carousel/lib/styles.css";
import InputSearch from "./InputSearch";
import SliderImage from "./SliderImage";
import { getSlider } from "@/actions/slider.action";

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
        mx: 2,
        borderRadius: "var(--mui-shape-borderRadius)",
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.015) 0%, rgba(0, 0, 0, 0.1) 100%)`,
      }}
    >
      <SliderImage images={images} />
      <InputSearch />
    </Box>
  );
};

export default SearchSection;
