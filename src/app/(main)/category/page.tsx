import Breadcrumbs from "@/views/components/base/Breadcrumbs";
import InputSearch from "@/views/components/base/Input/InputSearch";
import LoadComponent from "@/views/components/base/LoadComponent/LoadComponent";

import MainTemplate from "@/views/components/templates/MainTemplate";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Metadata } from "next";
import CategoryPopulerSection from "./_partial/CategoryPopulerSection";
import AllCategorySection from "./_partial/AllCategorySection";

export const metadata: Metadata = {
  title: "Kategori",
  description:
    "Jelajahi beragam layanan yang ditawarkan oleh para profesional terampil.",
};

export default async function Page() {
  return (
    <MainTemplate>
      <Stack spacing={"0.75rem"} px={2}>
        <Typography
          fontSize={32}
          lineHeight={1.25}
          fontWeight={700}
          minWidth={"18rem"}
        >
          Kategori
        </Typography>
        <Typography
          component={"p"}
          variant="subtitle2"
          color="var(--blue-color)"
          fontWeight={400}
          lineHeight={1.5}
          minWidth={"18rem"}
        >
          Jelajahi beragam layanan yang ditawarkan oleh para profesional
          terampil.
        </Typography>
      </Stack>

      <Stack px={2} py={"12px"}>
        <InputSearch />
      </Stack>

      <CategoryPopulerSection />


      <AllCategorySection/>

    </MainTemplate>
  );
}
