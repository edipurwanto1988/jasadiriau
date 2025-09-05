import Breadcrumbs from "@/views/components/base/Breadcrumbs";
import InputSearch from "@/views/components/base/Input/InputSearch";

import MainTemplate from "@/views/components/templates/MainTemplate";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Metadata } from "next";
import CategoryPopulerSection from "@/views/pages/category/CategoryPopulerSection";
import AllCategorySection from "@/views/pages/category/AllCategorySection";
import { getCategories } from "@/actions/category.action";
import { getSetting } from "@/actions/setting.action";

export async function generateMetadata(): Promise<Metadata> {
  const setting = await getSetting();
  return {
    title: `Kategori Jasa | ${setting?.siteName || "JasaDiRiau"} `,
    description: `Jelajahi berbagai kategori jasa di ${
      setting?.siteName || "JasaDiRiau"
    }. Temukan penyedia terbaik sesuai kebutuhan Anda.`,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/kategori`,
    },
    openGraph: {
      title: `Kategori Jasa | ${setting?.siteName || "JasaDiRiau"} `,
      description: `Jelajahi berbagai kategori jasa di ${
        setting?.siteName || "JasaDiRiau"
      }. Temukan penyedia terbaik sesuai kebutuhan Anda.`,
      type: "website",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/kategori`,
    },
    twitter: {
      title: `Kategori Jasa | ${setting?.siteName || "JasaDiRiau"} `,
      description: `Jelajahi berbagai kategori jasa di ${
        setting?.siteName || "JasaDiRiau"
      }. Temukan penyedia terbaik sesuai kebutuhan Anda.`,
    },
  };
}

export default async function Page() {
  const categories = await getCategories();
  return (
    <MainTemplate>
      <Stack
        spacing={2}
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
      >
        <Stack spacing={2}>
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

          <Typography
            fontSize={32}
            lineHeight={1.25}
            fontWeight={700}
            minWidth={"18rem"}
          >
            Kategori
          </Typography>
          <Typography
            component={"p"}
            variant="subtitle2"
            color="var(--blue-color)"
            fontWeight={400}
            lineHeight={1.5}
            minWidth={"18rem"}
          >
            Jelajahi beragam layanan yang ditawarkan oleh para profesional
            terampil.
          </Typography>
        </Stack>

        <InputSearch name="q" formProps={{ action: "/search" }} button />

        <CategoryPopulerSection />

        <AllCategorySection data={categories} />
      </Stack>
    </MainTemplate>
  );
}
