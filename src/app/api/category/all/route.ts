import api from "@/utils/api";
import CategoryResource from "@/http/resources/category.resource";
import { categoryAll } from "@/http/services/category.service";
import { NextResponse } from "next/server";

export const GET = api(async (req) => {
  const result = await categoryAll();
  return NextResponse.json(CategoryResource.collection(result, true));
});
