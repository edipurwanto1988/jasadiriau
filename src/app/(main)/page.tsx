import SearchSection from "@/views/pages/home/SearchSection";
import CategoryPopulerSection from "@/views/pages/home/CategoryPopulerSection";
import AdvantageSection from "@/views/pages/home/AdvantageSection";
import ExcellentServiceSection from "@/views/pages/home/ExcellentServiceSection";
import MainTemplate from "@/views/components/templates/MainTemplate";
import { getSetting } from "@/actions/setting.action";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const setting = await getSetting();
  return {
    title: setting?.metaTitle,
    description: setting?.metaDescription,
    keywords: setting?.metaKeywords,
  };
}

export default async function Page() {
  return (
    <MainTemplate>
      <SearchSection />
      <CategoryPopulerSection />
      <AdvantageSection />
      <ExcellentServiceSection />
    </MainTemplate>
  );
}
