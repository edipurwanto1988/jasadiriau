import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";
import { Role } from "@/generated/prisma";

export default async function authMiddleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const admin = path.startsWith("/admin");
  const account = path.startsWith("/account");
  const xor = admin || account;

  if (xor) {
    const cookie = (await cookies()).get("session")?.value;
    if (!cookie) {
      return NextResponse.redirect(new URL("/login", req.nextUrl));
    }

    const session = await decrypt(cookie);
    if (!session?.userId && xor) {
      return NextResponse.redirect(new URL("/login", req.nextUrl));
    }

    if (admin && session.role !== Role.admin || admin && session.role !== Role.operator) {
      return NextResponse.redirect(new URL("/404", req.nextUrl));
    }
  }

  return NextResponse.next();
}
