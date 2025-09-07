import Breadcrumbs from "@/views/components/base/Breadcrumbs";
import InputSearch from "@/views/components/base/Input/InputSearch";
import MainTemplate from "@/views/components/templates/MainTemplate";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Metadata } from "next";
import { getSetting } from "@/actions/setting.action";
import Box from "@mui/material/Box";
import { getBusinessPaginate } from "@/actions/business-profile.action";
import BusinessSimpleCard from "@/views/pages/busines-profile/BusinessSimpleCard";
import SimplePagination from "@/views/components/base/Pagination/SimplePagination";

type Props = {
  searchParams: Promise<Partial<Record<string, string>>>;
};

export async function generateMetadata(): Promise<Metadata> {
  const setting = await getSetting();
  return {
    title: `Penyedia Jasa | ${setting?.siteName || "JasaDiRiau"} `,
    description: `Jelajahi berbagai penyedia jasa di ${
      setting?.siteName || "JasaDiRiau"
    }.`,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/penyedia-jasa`,
    },
    openGraph: {
      title: `Penyedia Jasa | ${setting?.siteName || "JasaDiRiau"} `,
      description: `Jelajahi berbagai penyedia jasa di ${
        setting?.siteName || "JasaDiRiau"
      }.`,
      type: "website",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/penyedia-jasa`,
    },
    twitter: {
      title: `Penyedia Jasa | ${setting?.siteName || "JasaDiRiau"} `,
      description: `Jelajahi berbagai penyedia jasa di ${
        setting?.siteName || "JasaDiRiau"
      }.`,
    },
  };
}

export default async function Page({ searchParams }: Props) {
  const qs = await searchParams;
  const { total, data } = await getBusinessPaginate(qs);
  return (
    <MainTemplate>
      <Stack
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
            Penyedia Jasa
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

        <InputSearch
          placeholder="Cari Penyedia Jasa"
          name="q"
          formProps={{ action: "/search" }}
          button
        />

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
            <BusinessSimpleCard key={i} data={value} />
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
