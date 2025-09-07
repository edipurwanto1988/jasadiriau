import Breadcrumbs from "@/views/components/base/Breadcrumbs";
import ILink from "@/views/components/base/Link/ILink";
import SimplePagination from "@/views/components/base/Pagination/SimplePagination";
import MainTemplate from "@/views/components/templates/MainTemplate";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { Metadata } from "next";
import { getArticlePaginate } from "@/actions/article.action";
import { getSetting } from "@/actions/setting.action";
import { dateFormat } from "@/utils/format";
import './style.scss';

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
  const { total, data } = await getArticlePaginate(qs);
  return (
    <MainTemplate>
      <Stack
        direction={"column"}
        spacing={4}
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
            fontSize={22}
            lineHeight={1.25}
            fontWeight={700}
            minWidth={"18rem"}
          >
            Artikel
          </Typography>
        </Stack>

        <Stack direction={"column"} spacing={1}>
          {data.map((value, i) => (
            <Paper
            //   variant="outlined"
            elevation={0}
              key={i}
              sx={{
                p: 2,
                display: "flex",
                direction: "column",
              }}
            >
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
                <Box
                  sx={{
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: 0.5,
                    height: 128,
                    width: {
                      xs: "100%",
                      sm: "100%",
                      md: 256,
                      lg: 256,
                      xl: 256,
                    },
                  }}
                >
                  <Image
                    src={value.thumbnail ?? "/images/placeholder.ebp"}
                    alt={value.title}
                    fill
                    priority
                  />
                </Box>
                <Stack direction={"column"} spacing={1}>
                  <Box>
                    <ILink
                      href={`${process.env.NEXT_PUBLIC_BASE_URL}/article/${value.slug}`}
                      sx={{
                        fontSize: {
                          xs: "16px !important",
                          sm: "16px !important",
                          md: "18px !important",
                          lg: "18px !important",
                          xl: "18px !important",
                        },
                        fontWeight: "700 !important",
                      }}
                    >
                      {value.title}
                    </ILink>
                  </Box>

                  <Stack
                    direction={{
                      xs: "column",
                      sm: "column",
                      md: "row",
                      lg: "row",
                      xl: "row",
                    }}
                    alignItems={{
                      xs: "baseline",
                      sm: "baseline",
                      md: "center",
                      lg: "center",
                      xl: "center",
                    }}
                    spacing={{
                      xs: 0,
                      sm: 0,
                      md: 1,
                      lg: 1,
                      xl: 1,
                    }}
                  >
                    <Box>
                      <Typography variant="caption">
                        Diposting Tanggal:{" "}
                        {dateFormat(value.createdAt?.toISOString(), {
                          time: true,
                        })}{" "}
                      </Typography>
                    </Box>

                    {value.category ? (
                      <>
                        <Divider flexItem orientation="vertical" />
                        <Box>
                          <ILink
                            href={`${process.env.NEXT_PUBLIC_BASE_URL}/category/${value.category.slug}`}
                            sx={{
                              fontSize: "12px !important",
                              fontWeight: "400 !important",
                            }}
                          >
                            {value.category.name}
                          </ILink>
                        </Box>
                      </>
                    ) : null}
                  </Stack>
                </Stack>
              </Stack>
            </Paper>
          ))}
        </Stack>

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
