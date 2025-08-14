import { authRegister } from "@/http/services/auth.service";
import api from "@/utils/api";
import { NextResponse } from "next/server";

export const POST = api(async (req) => {
  const payload = await req.json();
  if (payload.credential) {
    await authRegister(payload.credential);
    return NextResponse.json({
      isLogin: true,
    });
  }
  return NextResponse.json({
    isLogin: false,
  });
});
