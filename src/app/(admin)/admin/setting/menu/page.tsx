import MenuSetting from "@/views/pages/menu/MenuSetting";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Menu",
};

export default async function Page() {
  return <MenuSetting />;
}
