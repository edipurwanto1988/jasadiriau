import AdvantageList from "@/views/pages/advantage/AdvantageList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Advantage",
};

export default async function Page() {
  return <AdvantageList />;
}
