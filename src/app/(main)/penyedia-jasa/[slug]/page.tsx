import {
  getBusinessAllSlug,
  getBusinessBySlug,
} from "@/actions/business-profile.action";
import { getSetting } from "@/actions/setting.action";
import GuestBusinessDetail from "@/views/pages/busines-profile/GuestBusinessDetail";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 60;

export async function generateStaticParams() {
  const data = await getBusinessAllSlug();
  return data.map((val) => ({
    slug: val.slug,
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

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const data = (await getBusinessBySlug(slug)) as unknown as BusinessProfile;
  const setting = await getSetting();

  return (
    <GuestBusinessDetail
      data={data}
      siteName={setting?.siteName || "JasaDiRiau"}
    />
  );
}
