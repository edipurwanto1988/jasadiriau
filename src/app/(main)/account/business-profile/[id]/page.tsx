import { getAuth } from "@/lib/auth";
import BusinessDetail from "@/views/pages/busines-profile/BusinessDetail";
import React from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;
  const auth = await getAuth();
  
  return <BusinessDetail id={id} role={auth?.role} />;
}
