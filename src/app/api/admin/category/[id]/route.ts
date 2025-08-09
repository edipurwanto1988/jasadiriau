import api from "@/utils/api";
import CategoryResource from "@/http/resources/category.resource";
import {
  categoryDetail,
  deleteCategory,
} from "@/http/services/category.service";
import { NextResponse } from "next/server";

export const GET = api(async (_, { params }) => {
  const { id } = await params;
  const data = await categoryDetail(+id);
  return NextResponse.json(new CategoryResource(data, { wrap: true }));
});

export const DELETE = api(async (_, { params }) => {
  const { id } = await params;
  await deleteCategory(+id);
  return new NextResponse(null, { status: 204 });
});
