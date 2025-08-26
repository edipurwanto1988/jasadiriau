import { deleteMenu } from "@/http/services/menu.service";
import api from "@/utils/api";
import { NextResponse } from "next/server";

export const DELETE = api(
  async (_, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    await deleteMenu(+id);
    return new NextResponse(null, { status: 204 });
  }
);
