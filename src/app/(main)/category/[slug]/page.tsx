import Breadcrumbs from "@/views/components/base/Breadcrumbs";
import BackButton from "@/views/components/base/Button/BackButton";
import MainTemplate from "@/views/components/templates/MainTemplate";
import ServiceSimpleCard from "@/views/pages/service/ServiceSimpleCard";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Metadata } from "next";
import { getCategories } from "@/actions/category.action";
import { getServiceByCategory } from "@/actions/service.action";
import { slugToWords } from "@/utils/string";
import SelectCategory from "@/views/pages/category/SelectCategory";
import SimplePagination from "@/views/components/base/Pagination/SimplePagination";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Partial<Record<string, string>>>;
};

export const revalidate = 60;

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((val: { slug: string }) => ({
    slug: val.slug,
  }));
}

export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  const { slug } = await params;
  const { page } = await searchParams;
  const categoryName = slugToWords(slug);

  return {
    title: `Jasa ${categoryName} - Page ${page || 1}`,
    description: `Halaman ${
      page || 1
    } dari daftar jasa untuk kategori ${categoryName}.`,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/category/${slug}`,
    },
    openGraph: {
      title: `Jasa ${categoryName} - Page ${page || 1}`,
      description: `Halaman ${
        page || 1
      } dari daftar jasa untuk kategori ${categoryName}.`,
      type: "website",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/category/${slug}`,
    },
    twitter: {
      title: `Jasa ${categoryName} - Page ${page || 1}`,
      description: `Halaman ${
        page || 1
      } dari daftar jasa untuk kategori ${categoryName}.`,
    },
  };
}

export default async function Page({ params, searchParams }: Props) {
  const { slug } = await params;
  const qs = await searchParams;
  const { total, data } = await getServiceByCategory({ category: slug, ...qs });
  const categories = await getCategories();

  return (
    <MainTemplate>
      <Stack
        direction={"column"}
        px={{
          xs: 3,
          sm: 3,
          md: 0,
          lg: 0,
          xl: 0,
        }}
        py={{
          xs: 2,
          sm: 2,
          md: 0,
          lg: 0,
          xl: 0,
        }}
        spacing={4}
        minHeight={"100%"}
      >
        <Stack direction={"column"} spacing={1}>
          <BackButton />
          <Breadcrumbs
            boxProps={{
              sx: {
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
              },
            }}
          />
        </Stack>

        <Stack
          direction={{
            xs: "column",
            sm: "column",
            md: "row",
            lg: "row",
            xl: "row",
          }}
          spacing={2}
        >
          <Typography
            variant="h1"
            sx={{ fontSize: { xs: 20 }, fontWeight: 600, flexGrow: 1 }}
          >
            {slugToWords(slug)}
          </Typography>

          <SelectCategory slug={slug} categories={categories} />
        </Stack>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(1, 1fr)",
              sm: "repeat(1, 1fr)",
              md: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
              xl: "repeat(3, 1fr)",
            },
            gap: "12px",
            width: "100%",
          }}
        >
          {data.map((value, i) => (
            <ServiceSimpleCard key={i} data={value} />
          ))}
        </Box>

        {total === 0 ? (
          <Box>
            <Typography align="center">Data belum tersedia.</Typography>
          </Box>
        ) : null}

        <SimplePagination total={total} page={qs.page} />
      </Stack>
    </MainTemplate>
  );
}
