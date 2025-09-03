import AccountBusiness from "@/views/pages/busines-profile/AccountBusiness";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profil Bisnis",
};

export default function Page() {
  return <AccountBusiness />;
}
