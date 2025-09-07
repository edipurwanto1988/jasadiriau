import { Metadata } from "next";
import dynamic from "next/dynamic";

type Props = {
  params: Promise<{ id: string }>;
};

export const metadata: Metadata = {
  title: "Halaman",
};

const PageEditor = dynamic(() => import("@/views/pages/page/PageEditor"));

export default async function Page({ params }: Props) {
  const { id } = await params;
  return <PageEditor pageID={id} />;
}
