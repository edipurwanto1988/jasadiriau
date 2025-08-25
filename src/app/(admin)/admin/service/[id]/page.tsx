import ServiceDetail from "@/views/pages/service/ServiceDetail";
import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: Promise<{ id: number }>;
};

export const metadata: Metadata = {
  title: "Layanan",
};

export default async function Page({ params }: Props) {
  const id = (await params).id;

  return <ServiceDetail id={id} />;
}
