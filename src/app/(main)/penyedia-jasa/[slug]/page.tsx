import Breadcrumbs from "@/views/components/base/Breadcrumbs";
import MainTemplate from "@/views/components/templates/MainTemplate";
import Box from "@mui/material/Box";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Metadata } from "next";
import {
  getBusinessAllSlug,
  getBusinessBySlug,
} from "@/actions/business-profile.action";
import { getSetting } from "@/actions/setting.action";

const BackButton = dynamic(
  () => import("@/views/components/base/Button/BackButton")
);
const GuestBusinessDetail = dynamic(
  () => import("@/views/pages/busines-profile/GuestBusinessDetail")
);
const BusinessWAButton = dynamic(
  () => import("@/views/pages/busines-profile/BusinessWAButton")
);

type Props = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 60;

export async function generateStaticParams() {
  if (process.env.SKIP_DB === "true") {
    return [];
  }
  const data = await getBusinessAllSlug();
  return data.map((val) => ({
    slug: val.slug as string,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = (await getBusinessBySlug(slug)) as unknown as BusinessProfile;
  return {
    title: data?.businessName,
    description: data?.description,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/penyedia-jasa/${slug}`,
    },
  };
}
const profile = `${process.env.NEXT_PUBLIC_BASE_URL}/images/placeholder.webp`;

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const data = (await getBusinessBySlug(slug)) as unknown as BusinessProfile;
  const setting = await getSetting();

  return (
    <MainTemplate>
      <Box sx={{ width: "100%", minHeight: "100%", overflow: "hidden auto" }}>
        <Stack
          direction={"column"}
          spacing={4}
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
        >
          <Stack direction={"column"} spacing={1}>
            <BackButton />
            <Breadcrumbs
              text={data.businessName ?? ""}
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
                    alt={data?.businessName ?? "profile"}
                    fill
                    priority
                    sizes="100%"
                    style={{ objectFit: "cover" }}
                  />
                </Box>
              </Stack>

              <Stack direction={"column"} justifyContent={"flex-start"}>
                <Box>
                  <ListItemText
                    primary={data?.businessName}
                    secondary={"Kategori"}
                    slotProps={{
                      primary: {
                        component: "h1",
                        fontSize: 22,
                        fontWeight: 700,
                        letterSpacing: "-0.015em",
                        lineHeight: 1.25,
                      },
                      secondary: {
                        variant: "subtitle1",
                        color: "var(--blue-color)",
                        fontWeight: 400,
                      },
                    }}
                  />
                </Box>
              </Stack>
            </Stack>
            <BusinessWAButton
              data={data}
              siteName={setting?.siteName ?? "JasaDiRiau.com"}
            />
          </Stack>

          <GuestBusinessDetail data={data} />
        </Stack>
      </Box>
    </MainTemplate>
  );
}
