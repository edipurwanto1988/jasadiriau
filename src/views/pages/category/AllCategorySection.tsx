import ILink from "@/views/components/base/Link/ILink";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

type Props = {
  data: {
    id: number;
    name: string;
    slug: string;
    imageUrl: string | null;
  }[];
};

const AllCategorySection = ({ data }: Props) => {
  return (
    <Stack
      sx={{
        p: 2,
        width: "100%",
        overflow: "auto hidden",
      }}
      spacing={4}
    >
      <Box>
        <Typography
          fontWeight={700}
          fontSize={22}
          lineHeight={1.25}
          letterSpacing={"-0.015em"}
        >
          Semua Kategori
        </Typography>
      </Box>

      <Stack
        direction={"row"}
        alignItems={"stretch"}
        gap={"12px"}
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 176px)",
          width: "100%",
          gap: "12px",
        }}
      >
        {data.map((value, i) => (
          <Box
            key={i}
            sx={{
              p: 2,
              borderRadius: "var(--mui-shape-borderRadius)",
              border: 1,
              borderColor: "#cedbe8",
              width: 176,
              height: 74,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ILink
              prefetch={false}
              scroll={false}
              href={`/category/${value.slug}`}
            >
              <Typography fontWeight={700} lineHeight={1.25}>
                {value.name}
              </Typography>
            </ILink>
          </Box>
        ))}
      </Stack>
    </Stack>
  );
};

export default AllCategorySection;
