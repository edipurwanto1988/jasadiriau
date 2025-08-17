
import SearchSection from "@/views/pages/home/SearchSection";
import CategoryPopulerSection from "@/views/pages/home/CategoryPopulerSection";
import AdvantageSection from "@/views/pages/home/AdvantageSection";
import ExcellentServiceSection from "@/views/pages/home/ExcellentServiceSection";
import MainTemplate from "@/views/components/templates/MainTemplate";

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
