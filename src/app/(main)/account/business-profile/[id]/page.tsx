"use client";
import React from "react";
import dynamic from "next/dynamic";

const BusinessDetail = dynamic(
  () => import("@/views/pages/busines-profile/BusinessDetail"),
  { ssr: false }
);

export default function Page() {
  return <BusinessDetail />;
}
