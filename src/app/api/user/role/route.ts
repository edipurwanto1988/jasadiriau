import UserResource from "@/http/resources/user.resource";
import { updateRole } from "@/http/services/user.service";
import { NextResponse } from "next/server";
import api from "@/utils/api";

export const PUT = api(async (req) => {
  const payload = await req.json();
  const result = await updateRole(payload);
  return NextResponse.json(new UserResource(result, true));
});
