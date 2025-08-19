import AccountBusiness from "@/views/pages/busines-profile/AccountBusiness";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profil Bisnis",
  description:
    "Jelajahi beragam layanan yang ditawarkan oleh para profesional terampil.",
};

export default async function Page() {
  return <AccountBusiness />;
}
