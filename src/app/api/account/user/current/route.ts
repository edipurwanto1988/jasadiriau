import api from "@/utils/api";
import UserResource from "@/http/resources/user.resource";
import { getCurrent } from "@/http/services/user.service";
import { verifySession } from "@/lib/session";
import { NextResponse } from "next/server";

export const GET = api(async (req) => {
  
  const session = await verifySession();
  if (!session) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  const result = await getCurrent(session.userId);
  return NextResponse.json(new UserResource(result, true), {
    status: 201,
  });
});