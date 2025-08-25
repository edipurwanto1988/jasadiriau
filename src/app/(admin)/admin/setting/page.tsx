import SettingForm from "@/views/pages/setting/SettingForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Slider",
};

export default async function Page() {
  return <SettingForm />;
}
