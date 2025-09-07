import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Halaman",
};

const PageEditor = dynamic(() => import("@/views/pages/page/PageEditor"));

export default function Page() {
  return <PageEditor />;
}
