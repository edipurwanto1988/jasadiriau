import { getSetting } from "@/actions/setting.action";
import MainTemplate from "@/views/components/templates/MainTemplate";
import FilterSearch from "@/views/pages/search/FilterSearch";
import ListSearch from "@/views/pages/search/ListSearch";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Metadata, ResolvedMetadata } from "next";

type Props = {
  searchParams: Promise<Partial<Record<string, string>>>;
};

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export async function generateMetadata(
  { searchParams }: Props,
  parent: ResolvedMetadata
): Promise<Metadata> {
  const { q } = await searchParams;
  const setting = await getSetting();

  // const title = keyword
  //   ? `Cari "${keyword}"${category}${location} | JasaMu`
  //   : "Cari Jasa | JasaMu";

  // const description = keyword
  //   ? `Temukan penyedia jasa terbaik untuk "${keyword}"${category}${location}. Bandingkan layanan, harga, dan ulasan penyedia jasa.`
  //   : "Cari penyedia jasa terbaik sesuai kebutuhan Anda di JasaMu.";

  return {
    title: q
      ? `Cari Jasa Berdasarkan Kata Kunci "${q}" | ${setting?.siteName}`
      : `Cari Jasa | ${setting?.siteName}`,
    description: q
      ? `Temukan penyedia jasa terbaik sesuai kata kunci "${q}". Bandingkan layanan, harga, dan ulasan penyedia jasa.`
      : `Cari penyedia jasa terbaik sesuai kebutuhan Anda di ${setting?.siteName}.`,
    alternates: {
      canonical: `${baseUrl}/search`,
    },
    robots: "noindex, follow",
  };
}

export default async function Page({ searchParams }: Props) {
  const { q } = await searchParams;
  return (
    <main>
      <Stack
        flex={"1 1 0%"}
        direction={"row"}
        justifyContent={"center"}
       
        boxSizing={"border-box"}
        minHeight={"100%"}
        sx={{
           px: {
            xs: 1,
            sm: 1,
            md: "10rem",
            lg: "10rem",
            xl: "10rem",
          },
          py: {
            xs: 1,
            sm: 1,
            md: "1.25rem",
            lg: "1.25rem",
            xl: "1.25rem",
          },
        }}
      >
        <Stack
          direction={"column"}
          gap={"12px"}
          flex={1}
           minHeight={"100%"}
        >
          <Toolbar />

          <Stack direction={"column"} spacing={3}  minHeight={"100%"}>
            <Typography
              variant="h1"
              sx={{ fontSize: { xs: 20 }, fontWeight: 600 }}
            >
              {q ? `Hasil Pencarian untuk "${q}"` : "Cari Jasa"}
            </Typography>

            <ListSearch />
          </Stack>
        </Stack>
      </Stack>
    </main>
  );
}
