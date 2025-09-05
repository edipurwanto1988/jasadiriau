import { getServiceAllSlug, getServiceBySlug } from "@/actions/service.action";
import { getSetting } from "@/actions/setting.action";
import GuestServiceDetail from "@/views/pages/service/GuestServiceDetail";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 60;

export async function generateStaticParams() {
  const data = await getServiceAllSlug();
  return data.map((val) => ({
    slug: val.slug,
  }));
}

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
    <GuestServiceDetail
      data={data}
      siteName={setting?.siteName ?? "JasaDiRiau"}
    />
  );
}
