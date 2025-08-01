import api from "@/utils/api";
import { CategoryResource } from "@/services/api/category/api.category.resource";
import {
  categoryDetail,
  deleteCategory,
} from "@/services/api/category/api.category.service";
import { NextResponse } from "next/server";

export const GET = api(async (_, { params: { id } }) => {
  const data = await categoryDetail(+id);
  return NextResponse.json(new CategoryResource(data, { wrap: true }));
});

export const DELETE = api(async (_, { params: { id } }) => {
  await deleteCategory(+id);
  return new NextResponse(null, { status: 204 });
});
