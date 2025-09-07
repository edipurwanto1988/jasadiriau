import { Metadata } from "next";
import dynamic from "next/dynamic";
import Template from "./template";

export const metadata: Metadata = {
  title: "Artikel",
};

const ArticleEditor = dynamic(
  () => import("@/views/pages/article/ArticleEditor")
);

export default function Page() {
  return (
    <Template>
      <ArticleEditor />
    </Template>
  );
}
