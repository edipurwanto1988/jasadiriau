import ServiceTable from "@/views/pages/service/ServiceList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Layanan",
};

export default async function Page() {
  return <ServiceTable />;
}
