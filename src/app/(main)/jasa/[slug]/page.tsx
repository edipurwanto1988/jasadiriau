import { getServiceAllSlug, getServiceBySlug } from "@/actions/service.action";
import { getSetting } from "@/actions/setting.action";
import { rupiah } from "@/utils/format";
import Breadcrumbs from "@/views/components/base/Breadcrumbs";
import CategoryChip from "@/views/components/base/Chip/CategoryChip";
import MainTemplate from "@/views/components/templates/MainTemplate";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";

const BackButton = dynamic(
  () => import("@/views/components/base/Button/BackButton")
);
const GuestServiceDetail = dynamic(
  () => import("@/views/pages/service/GuestServiceDetail")
);
const ServiceWAButton = dynamic(
  () => import("@/views/pages/service/ServiceWAButton")
);

type Props = {
  params: Promise<{ slug: string }>;
};

// export const revalidate = 60;

// export async function generateStaticParams() {
//   if (process.env.SKIP_DB === "true") {
//     return [];
//   }
//   const data = await getServiceAllSlug();
//   return data.map((val) => ({
//     slug: val.slug,
//   }));
// }

const profile = `${process.env.NEXT_PUBLIC_BASE_URL}/images/placeholder.webp`;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await getServiceBySlug(slug);
  const setting = await getSetting();
  return {
    title: `${data?.name} - ${data.category.name} | ${
      setting?.siteName || "JasaDiRiau"
    }`,
    description: data?.description,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/jasa/${slug}`,
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const data = await getServiceBySlug(slug);
  const setting = await getSetting();

  return (
    <MainTemplate>
      <Box sx={{ width: "100%", minHeight: "100%", overflow: "hidden auto" }}>
        <Stack
          px={{
            xs: 2,
            sm: 2,
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
          <Stack spacing={1}>
            <BackButton />
            <Breadcrumbs
              text={data.name ?? ""}
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
            <Stack flexGrow={1} direction={"row"} spacing={2}>
              <Stack direction={"column"} alignItems={"center"} spacing={1}>
                <Box
                  sx={{
                    position: "relative",
                    overflow: "hidden",
                    width: 128,
                    height: 128,
                    borderRadius: "8px",
                    backgroundColor: "var(--input-bg-color)",
                    border: 1,
                    borderColor: "divider",
                  }}
                >
                  <Image
                    src={data?.imageUrl ?? profile}
                    alt={data?.name ?? "service"}
                    fill
                    sizes="100%"
                    priority
                  />
                </Box>
              </Stack>

              <Stack
                direction={"column"}
                justifyContent={"flex-start"}
                spacing={0.5}
              >
                <Box>
                  <Typography
                    variant="h1"
                    sx={{
                      fontSize: `22px !important`,
                      fontWeight: 700,
                      letterSpacing: "-0.015em",
                      lineHeight: 1.25,
                    }}
                  >
                    {data?.name}
                  </Typography>
                </Box>

                <Box>
                  <Typography
                    component={Link}
                    href={`/penyedia-jasa/${data?.businessProfile?.slug}`}
                    prefetch={false}
                    scroll={false}
                    variant="subtitle2"
                    sx={{
                      fontSize: "16px !important",
                      color: "var(--blue-color)",
                      fontWeight: 500,
                    }}
                  >
                    {data?.businessProfile?.businessName}
                  </Typography>
                </Box>

                <Stack direction={"row"} spacing={1}>
                  <CategoryChip label="Jasa" />
                  <CategoryChip label={data?.category?.name} />
                </Stack>
              </Stack>
            </Stack>

            <Stack direction={"column"} spacing={1}>
              <Box>
                <Typography variant="subtitle1" fontWeight={500} align="right">
                  Biaya: {rupiah(data.price)}
                </Typography>
              </Box>

              <ServiceWAButton
                data={data}
                siteName={setting?.siteName ?? "JasaDiRiau"}
              />
            </Stack>
          </Stack>

          <GuestServiceDetail data={data} />

          <Toolbar />
          <Toolbar />
        </Stack>
      </Box>
    </MainTemplate>
  );
}
