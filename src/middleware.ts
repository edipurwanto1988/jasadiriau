import { NextRequest, NextResponse } from "next/server";
import authMiddleware from "./middlewares/auth.middleware";

export default async function middleware(req: NextRequest) {
  const auth = await authMiddleware(req);
  if (auth) return auth;

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
