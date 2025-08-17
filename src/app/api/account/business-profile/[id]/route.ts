import api from "@/utils/api";
import BusinessProfileResource from "@/http/resources/business-profile.resource";
import {
  getBusinessProfileID,
  deleteBusinessProfile,
} from "@/http/services/business-profile.service";
import { NextResponse } from "next/server";

export const GET = api(async (_, { params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const data = await getBusinessProfileID(+id);
  return NextResponse.json(new BusinessProfileResource(data, { wrap: true }));
});

export const DELETE = api(async (_, { params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  await deleteBusinessProfile(+id);
  return new NextResponse(null, { status: 204 });
});
