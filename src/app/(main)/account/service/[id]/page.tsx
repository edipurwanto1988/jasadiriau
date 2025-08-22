import ServiceDetail from "@/views/pages/service/ServiceDetail";
import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: Promise<{ id: number }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = (await params).id;

  return {
    title: "layanan",
    description: "",
  };
}

export default async function Page({ params }: Props) {
  const id = (await params).id;

  return <ServiceDetail id={id} />;
}
