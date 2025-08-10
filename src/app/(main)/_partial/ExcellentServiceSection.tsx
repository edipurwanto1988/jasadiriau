import InputLargeSearch from "@/views/components/base/Input/InputLargeSearch";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Image from "next/image";

const ExcellentServiceSection = () => {
  return (
    <Stack
      sx={{
        p: 2,
        width: "100%",
        overflow: "hidden",
      }}
      spacing={2}
    >
      <Box>
        <Typography fontWeight={500} fontSize={22} lineHeight={"28px"}>
          Jasa Unggulan
        </Typography>
      </Box>

      <Stack
        direction={"row"}
        spacing={2}
        sx={{
          flex: 1,
          flexWrap: "nowrap",
          width: "100%",
          overflow: "auto hidden",
        }}
      >
        {[...Array(3)].map((_, i) => (
          <Stack key={i} flexShrink={0} width={223} spacing={1}>
            <Box
              sx={{
                overflow: "hidden",
                borderRadius: "var(--mui-shape-borderRadius)",
                position: "relative",
                width: 223,
                height: 223,
              }}
            >
              <Image
                src={"/images/placeholder.webp"}
                alt=""
                objectFit="cover"
                width={223}
                height={223}
                priority
              />
            </Box>
            <Box>
              <Typography>Jasa Pembersih AC</Typography>
            </Box>
            <Box>
              <Typography
                lineHeight={"21px"}
                fontWeight={400}
                variant="subtitle2"
                color="#4A739C"
                alignSelf={"stretch"}
              >
                Jasa perbaikan AC profesional dengan teknisi berpengalaman.
              </Typography>
            </Box>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export default ExcellentServiceSection;
