import React from "react";
import LoadComponent from "@/views/components/base/LoadComponent/LoadComponent";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Image from "next/image";

const ChevronLeft = LoadComponent(
  () => import("@mui/icons-material/ChevronLeft")
);
const ChevronRight = LoadComponent(
  () => import("@mui/icons-material/ChevronRight")
);

const FiberManualRecord = LoadComponent(
  () => import("@mui/icons-material/FiberManualRecord")
);

const MUIBasicCarousel = ({
  items = [],
  interval = 3000,
}: {
  items: { image: string; alt: string }[];
  interval: number;
}) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const timerRef = React.useRef<NodeJS.Timeout | null>(null);

  const goTo = (index) => {
    setCurrentIndex((index + items.length) % items.length);
  };

  const goNext = () => {
    goTo(currentIndex + 1);
  };

  const goPrev = () => {
    goTo(currentIndex - 1);
  };

  React.useEffect(() => {
    timerRef.current = setInterval(goNext, interval);
    return () => {
      clearInterval(timerRef.current as NodeJS.Timeout);
    };
  }, [currentIndex, interval]);

  return (
    <Box
      position="relative"
      width="100%"
      overflow="hidden"
      maxWidth={800}
      mx="auto"
      borderRadius={2}
      boxShadow={3}
    >
      {/* Slide wrapper */}
      <Box
        display="flex"
        width={`${items.length * 100}%`}
        sx={{
          transform: `translateX(-${currentIndex * (100 / items.length)}%)`,
          transition: "transform 0.6s ease-in-out",
        }}
      >
        {items.map((item, idx) => (
          <Box key={idx} flex="0 0 100%">
            <Image
              src={item.image}
              alt={item.alt || `Slide ${idx}`}
              loading="lazy"
              width={500}
              height={250}
            />
          </Box>
        ))}
      </Box>

      {/* Navigation buttons */}
      <IconButton
        onClick={goPrev}
        sx={{
          position: "absolute",
          top: "50%",
          left: 10,
          transform: "translateY(-50%)",
          backgroundColor: "rgba(0,0,0,0.5)",
          color: "white",
          "&:hover": { backgroundColor: "rgba(0,0,0,0.7)" },
        }}
      >
        <ChevronLeft />
      </IconButton>

      <IconButton
        onClick={goNext}
        sx={{
          position: "absolute",
          top: "50%",
          right: 10,
          transform: "translateY(-50%)",
          backgroundColor: "rgba(0,0,0,0.5)",
          color: "white",
          "&:hover": { backgroundColor: "rgba(0,0,0,0.7)" },
        }}
      >
        <ChevronRight />
      </IconButton>

      {/* Dots */}
      <Box
        position="absolute"
        bottom={12}
        left="50%"
        display="flex"
        gap={1}
        sx={{ transform: "translateX(-50%)" }}
      >
        {items.map((_, idx) => (
          <IconButton
            key={idx}
            size="small"
            onClick={() => goTo(idx)}
            sx={{
              color: idx === currentIndex ? "white" : "white",
              opacity: idx === currentIndex ? 1 : 0.5,
            }}
          >
            <FiberManualRecord fontSize="small" />
          </IconButton>
        ))}
      </Box>
    </Box>
  );
};

export default MUIBasicCarousel;
