import {
  getMeta
} from "@/http/services/business-profile.service";
import api from "@/utils/api";
import { NextResponse } from "next/server";

export const GET = api(async (req) => {
  const result = await getMeta();
  return NextResponse.json({ data: result });
});
