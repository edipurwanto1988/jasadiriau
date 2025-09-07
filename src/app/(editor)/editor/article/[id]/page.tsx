import { Metadata } from "next";
import dynamic from "next/dynamic";
import Template from "./template";

type Props = {
  params: Promise<{ id: string }>;
};

export const metadata: Metadata = {
  title: "Halaman",
};

const ArticleEditor = dynamic(() => import("@/views/pages/article/ArticleEditor"));

export default async function Page({ params }: Props) {
  const { id } = await params;
  return (
    <Template>
      <ArticleEditor articleID={id} />
    </Template>
  );
}
