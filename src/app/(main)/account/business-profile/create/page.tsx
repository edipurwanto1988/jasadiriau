import React from "react";
import Template from "./template";
import { Metadata } from "next";
import AccountCreateBusiness from "@/views/pages/busines-profile/AccountCreateBusiness";

export const metadata: Metadata = {
  title: "Bisnis Profil",
  description:
    "Isi formulir pendaftaran untuk membuat profil bisnis Anda dan mulai menjangkau lebih banyak pelanggan.",
};

export default async function Page() {
  return (
    <Template>
      <AccountCreateBusiness />
    </Template>
  );
}
