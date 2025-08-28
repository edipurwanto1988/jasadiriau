import { deleteImage } from "@/http/services/image.service";
import api from "@/utils/api";

import { NextResponse } from "next/server";

export const DELETE = api(async (_, { params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  await deleteImage(+id);
  return new NextResponse(null, { status: 204 });
});
