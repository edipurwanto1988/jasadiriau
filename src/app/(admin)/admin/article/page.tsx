import ArticleTable from "@/views/pages/article/ArticleTable";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Artikel",
};

export default async function Page() {
  return <ArticleTable />;
}
