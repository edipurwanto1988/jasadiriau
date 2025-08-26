import {
  createMenu,
  getMenuAll,
  updateMenu,
} from "@/http/services/menu.service";
import api from "@/utils/api";
import { NextResponse } from "next/server";

export const GET = api(async (req) => {
  const results = await getMenuAll(req.nextUrl.searchParams);
  return NextResponse.json({ data: results });
});

export const POST = api(async (req) => {
  const payload = await req.json();
  const result = await createMenu(payload);
  return NextResponse.json({ data: result }, { status: 201 });
});

export const PUT = api(async (req) => {
  const payload = await req.json();
  const result = await updateMenu(payload);
  return NextResponse.json({ data: result });
});
