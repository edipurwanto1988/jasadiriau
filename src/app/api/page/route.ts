import api from "@/utils/api";

import { NextResponse } from "next/server";
import { createPage, pagePaginate, updatePage } from "@/http/services/page.service";
import { createPageSchema, updatePageSchema } from "@/schema/page.schema";
import PageResource from "@/http/resources/page.resource";

export const GET = api(async (req) => {

  const result = await pagePaginate(req.nextUrl.searchParams);
  return NextResponse.json(PageResource.paginate(result));
});

export const POST = api(async (req) => {
  const payload = await req.json();
  const validated = await createPageSchema.parseAsync(payload);

  const result = await createPage(validated);
  return NextResponse.json(new PageResource(result, true), {
    status: 201,
  });
});

export const PUT = api(async (req) => {
  const payload = await req.json();
  const validated = await updatePageSchema.parseAsync(payload);
  const result = await updatePage(validated);
  return NextResponse.json(new PageResource(result, true));
});
