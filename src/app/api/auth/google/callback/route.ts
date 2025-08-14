import api from "@/utils/api";
import { NextResponse } from "next/server";


export const GET = api(async (req) => {
  
  return NextResponse.json({});
});

export const POST = api(async (req) => {
  const payload = await req.json();

  return NextResponse.json(payload);
});