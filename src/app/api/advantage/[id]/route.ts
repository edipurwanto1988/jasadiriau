import api from "@/utils/api";
import AdvantageResource from "@/http/resources/advantage.resource";
import {
  getAdvantageID,
  deleteAdvantage,
  updateStatusAdvantage,
} from "@/http/services/advantage.service";
import { NextResponse } from "next/server";

export const GET = api(
  async (_, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const data = await getAdvantageID(+id);
    return NextResponse.json(new AdvantageResource(data, { wrap: true }));
  }
);

export const DELETE = api(
  async (_, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    await deleteAdvantage(+id);
    return new NextResponse(null, { status: 204 });
  }
);

export const PATCH = api(
  async (_, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const data = await updateStatusAdvantage(+id);
    return NextResponse.json(new AdvantageResource(data, { wrap: true }));
  }
);
