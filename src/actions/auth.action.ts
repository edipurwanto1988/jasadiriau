"use server";
import prisma from "@/lib/db";
import bcrypt from "bcryptjs";
import { createSession, deleteSession } from "@/lib/session";
import { FormState, SigninFormSchema } from "@/schema/signin.schema";
import { parseZodError } from "@/utils/format";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { Role } from "@/generated/prisma";

export async function signin(state: FormState, formData: FormData) {
  const validatedFields = SigninFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: Object.fromEntries(
        parseZodError(validatedFields.error).flatMap((v) => Object.entries(v))
      ),
    };
  }

  const payload = validatedFields.data;
  const user = await prisma.user.findFirst({
    where: { isActive: true, email: payload.email },
  });

  if (!user) {
    return {
      message:
        "Login gagal. Silakan periksa kembali email dan kata sandi Anda.",
    };
  }

  const valid = await bcrypt.compare(payload.password, user.password!);
  if (!valid) {
    return {
      message:
        "Login gagal. Silakan periksa kembali email dan kata sandi Anda.",
    };
  }

  await createSession(user);

  redirect(user.role === Role.admin ? "/admin" : "/");
}

export async function signout() {
  await deleteSession();
  revalidatePath("/", "layout");
}
