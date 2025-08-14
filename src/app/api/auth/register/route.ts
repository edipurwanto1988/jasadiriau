import { authRegister } from "@/http/services/auth.service";
import api from "@/utils/api";
import { NextResponse } from "next/server";

export const POST = api(async (req) => {
  const payload = await req.json();
  if (payload.credential) {
    const user = await authRegister(payload.credential);
    return NextResponse.json({
      isLogin: true,
      role: user.role,
    });
  }
  return NextResponse.json({
    isLogin: false,
    role: "user",
  });
});
