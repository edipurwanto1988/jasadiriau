import React from "react";
import dynamic from "next/dynamic";

const DynamicComponentWithNoSSR = dynamic(
  () => import('@/views/pages/busines-profile/AdminBusiness'),
  { ssr: false }
)

export default async function Page() {
  return <DynamicComponentWithNoSSR />;
}
