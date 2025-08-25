import MenuForm from "@/views/pages/menu/MenuForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Menu",
};

export default async function Page() {
  return <MenuForm />;
}
