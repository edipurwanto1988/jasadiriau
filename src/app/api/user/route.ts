import api from "@/utils/api";
import UserResource from "@/http/resources/user.resource";
import { userPaginate } from "@/http/services/user.service";
import { NextResponse } from "next/server";

export const GET = api(async (req) => {
  const result = await userPaginate(req.nextUrl.searchParams);
  return NextResponse.json(UserResource.paginate(result));
});
