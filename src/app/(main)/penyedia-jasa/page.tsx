import { getSetting } from "@/actions/setting.action";
import MainTemplate from "@/views/components/templates/MainTemplate";
import Typography from "@mui/material/Typography";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
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

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  return <MainTemplate>
    <Typography>Mau Cari apa disini</Typography>
  </MainTemplate>;
}
