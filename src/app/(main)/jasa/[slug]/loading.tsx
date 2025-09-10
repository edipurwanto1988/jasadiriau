import React from "react";
import DetailPageLoading from "@/views/components/base/Skeleton/DetailPageLoading";
import MainTemplate from "@/views/components/templates/MainTemplate";

export default async function Loading() {
  return (
    <MainTemplate>
      <DetailPageLoading />;
    </MainTemplate>
  );
}
