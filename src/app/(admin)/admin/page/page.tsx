import PageTable from "@/views/pages/page/PageTable";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Halaman",
};

export default async function Page() {
  return <PageTable />;
}
