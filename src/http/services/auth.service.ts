import { Role } from "@/generated/prisma";
import prisma from "@/lib/db";
import { createSession } from "@/lib/session";
import { decodeJwtResponse } from "@/utils/string";

export const authRegister = async (credential: string) => {
  const data = decodeJwtResponse(credential);

  const input = {
    name: data.name,
    email: data.email,
    googleTokenId: credential,
  };

  const user = await prisma.user.upsert({
    where: { email: data.email },
    create: { ...input, role: Role.user, isActive: true },
    update: input,
  });

  await createSession(user);
  return user;
};
