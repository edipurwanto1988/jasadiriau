import ServiceResource from "@/http/resources/service.resource";
import { deleteService, getServiceID } from "@/http/services/service.service";
import api from "@/utils/api";

import { NextResponse } from "next/server";

export const GET = api(async (_, { params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const data = await getServiceID(+id);
  return NextResponse.json(new ServiceResource(data, { wrap: true }));
});

export const DELETE = api(async (_, { params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  await deleteService(+id);
  return new NextResponse(null, { status: 204 });
});
