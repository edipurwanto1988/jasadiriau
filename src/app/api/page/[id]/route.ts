import PageResource from "@/http/resources/page.resource";
import { deletePage, getPageID } from "@/http/services/page.service";
import api from "@/utils/api";

import { NextResponse } from "next/server";

export const GET = api(async (_, { params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const data = await getPageID(+id);
  return NextResponse.json(new PageResource(data, { wrap: true }));
});

export const DELETE = api(async (_, { params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  await deletePage(+id);
  return new NextResponse(null, { status: 204 });
});
