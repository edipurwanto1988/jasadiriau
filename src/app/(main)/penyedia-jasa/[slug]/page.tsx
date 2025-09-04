import { getBusinessBySlug } from "@/actions/business-profile.action";
import { getSetting } from "@/actions/setting.action";
import GuestBusinessDetail from "@/views/pages/busines-profile/GuestBusinessDetail";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await getBusinessBySlug(slug) as unknown as BusinessProfile;
  return {
    title: data?.businessName,
    description: data?.description,
    alternates: {
      canonical: `https://hajatanku.com/jasa/`,
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
