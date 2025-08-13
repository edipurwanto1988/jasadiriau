
import SearchSection from "./_partial/SearchSection";
import CategoryPopulerSection from "./_partial/CategoryPopulerSection";
import AdvantageSection from "./_partial/AdvantageSection";
import ExcellentServiceSection from "./_partial/ExcellentServiceSection";
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
