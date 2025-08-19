import { NextResponse } from "next/server";
import api from "@/utils/api";
import { updateValidationSchema } from "@/schema/validation.schema";
import { updateValidation } from "@/http/services/validation.service";
import { verifySession } from "@/lib/session";
import ValidationResource from "@/http/resources/validation.resource";


export const POST = api(async (req) => {
  const payload = await req.json();
  const validated = await updateValidationSchema.parseAsync(payload);
  const session = await verifySession();
  if (!session) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  const result = await updateValidation(session.userId, validated);

  return NextResponse.json(new ValidationResource(result, true), {
    status: 201,
  });
});
