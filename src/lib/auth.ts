'use server';
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export const getAuth = async () => {
  const cookie = (await cookies()).get("session")?.value;
  if (!cookie) return null;

  const { payload: session } = await jwtVerify(cookie, encodedKey, {
    algorithms: ["HS256"],
  });

  if (!session?.userId) return null;

  return { isAuth: true, userId: +session.userId, role: session.role as RoleType };
};
