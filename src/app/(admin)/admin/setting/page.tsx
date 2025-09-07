import SettingForm from "@/views/pages/setting/SettingForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pengaturan",
};

export default function Page() {
  return <SettingForm />;
}
