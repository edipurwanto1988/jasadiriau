import api from "@/utils/api";
import {
  createCatgorySchema,
  updateCategorySchema,
} from "@/schema/category.schema";
import { CategoryResource } from "@/http/resources/category.resource";
import {
  categoryPaginate,
  createCategory,
  updateCategory,
} from "@/http/services/category.service";
import { NextResponse } from "next/server";

export const GET = api(async (req) => {
  const [count, data] = await categoryPaginate(req.nextUrl.searchParams);
  return NextResponse.json(CategoryResource.paginate({ total: count, data }));
});

export const POST = api(async (req) => {
  const payload = await req.json();
  const validated = await createCatgorySchema.parseAsync(payload);
  const result = await createCategory(validated);
  return NextResponse.json(new CategoryResource(result), { status: 201 });
});

export const PUT = api(async (req) => {
  const payload = await req.json();
  const validated = await updateCategorySchema.parseAsync(payload);
  const result = await updateCategory(validated);
  return NextResponse.json(new CategoryResource(result));
});
