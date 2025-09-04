import { getBusinessBySlug } from "@/actions/business-profile.action";
import { getServiceBySlug } from "@/actions/service.action";
import { getSetting } from "@/actions/setting.action";
import GuestBusinessDetail from "@/views/pages/busines-profile/GuestBusinessDetail";
import GuestServiceDetail from "@/views/pages/service/GuestServiceDetail";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await getServiceBySlug(slug);
  return {
    title: data?.name,
    description: data?.description,
    alternates: {
      canonical: `https://hajatanku.com/jasa/`,
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const data = await getServiceBySlug(slug);
  const setting = await getSetting();

  return (
    <GuestServiceDetail
      data={data}
      siteName={setting?.siteName ?? "JasaDiRiau"}
    />
  );
}
