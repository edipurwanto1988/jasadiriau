import { getSetting } from "@/actions/setting.action";
import MainTemplate from "@/views/components/templates/MainTemplate";
import Typography from "@mui/material/Typography";
import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { category } = await params;
  const setting = await getSetting();
  return {
    title: setting?.metaTitle,
    description: setting?.metaDescription,
    keywords: setting?.metaKeywords,
    alternates: {
      canonical: `https://hajatanku.com/jasa/`,
    },
  };
}

export default async function Page({ params, searchParams }: Props) {
  return (
    <MainTemplate>
      <Typography>Mau Cari apa disini</Typography>
    </MainTemplate>
  );
}
