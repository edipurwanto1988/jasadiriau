"use client";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./slider.css";
import Image from "next/image";
import Box from "@mui/material/Box";
type Props = {
  images: { title: string; imageUrl: string }[];
};
const SliderImage = ({ images }: Props) => {
  return (
    <Carousel
      showDots
      infinite
      autoPlay
      renderArrowsWhenDisabled
      responsive={{
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 1,
          slidesToSlide: 1, // optional, default to 1.
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 1,
          slidesToSlide: 1, // optional, default to 1.
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
          slidesToSlide: 1, // optional, default to 1.
        },
      }}
      sliderClass="container-slider"
      containerClass="container-slider"
    >
      {images.map((v, i) => (
        <Box
          key={i}
          sx={{
            width: "100%",
            position: "relative",
            aspectRatio: { xs: "4/3", sm: "16/9" }, // responsive ratio
          }}
        >
          <Image
            src={v.imageUrl}
            alt={v.title}
            fill
            priority={i === 0} // LCP
            loading={i === 0 ? "eager" : "lazy"} // slide l
            style={{ objectFit: "cover" }}
            sizes="100vw" // Optimalkan ukuran sesuai viewport
            placeholder="blur"
            blurDataURL="/images/placeholder.png"
          />

          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(rgba(0,0,0,0.04), rgba(0,0,0,0.1))",
            }}
          />
        </Box>
      ))}
    </Carousel>
  );
};

export default SliderImage;
