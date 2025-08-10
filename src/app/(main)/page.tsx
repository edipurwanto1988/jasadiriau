import LoadComponent from "@/views/components/base/LoadComponent/LoadComponent";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import SectionSearch from "./_partial/SectionSearch";
import CategoryPopulerSection from "./_partial/CategoryPopulerSection";
import AdvantageSection from "./_partial/AdvantageSection";
import ExcellentServiceSection from "./_partial/ExcellentServiceSection";

const SearchIcon = LoadComponent(() => import("@mui/icons-material/Search"));

export default function Page() {
  return (
    <Stack
      flex={"1 1 0%"}
      direction={"row"}
      justifyContent={"center"}
      px={"10rem"}
      py={"1.25rem"}
      boxSizing={"border-box"}
    >
      <Stack direction={"column"} maxWidth={"960px"} spacing={1}>
        <SectionSearch />
        <CategoryPopulerSection />
        <AdvantageSection />
        <ExcellentServiceSection />
      </Stack>
    </Stack>
  );
}
