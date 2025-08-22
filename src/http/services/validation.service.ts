import prisma from "@/lib/db";
import {
  CreateValidationSchema,
  UpdateValidationSchema,
} from "@/schema/validation.schema";
import dayjs from "dayjs";

export const createValidation = (payload: CreateValidationSchema) => {
  return prisma.$transaction(async (tx) => {
    if (payload.targetType === "profile") {
      await tx.businessProfile.update({
        where: { id: payload.targetId },
        data: { status: "pending" },
      });
    } else if (payload.targetType === "service") {
      await tx.service.update({
        where: { id: payload.targetId },
        data: { status: "pending" },
      });
    }
    return tx.validation.create({ data: payload });
  });
};

export const updateValidation = async (
  userId: number,
  payload: UpdateValidationSchema
) => {
  return prisma.$transaction(async (tx) => {
    const user = await tx.user.findFirstOrThrow({ where: { id: userId } });

    const validated = await tx.validation.update({
      where: {
        id: payload.id,
      },
      data: {
        operatorId: user.id,
        operatorName: user.name,
        validatedAt: dayjs().format(),
        action: payload.action,
        note: payload.note,
      },
    });

    if (validated.targetType === "profile") {
      await tx.businessProfile.update({
        where: { id: validated.targetId },
        data: {
          status: payload.action === "approved" ? "active" : "inactive",
        },
      });
    }
    return validated;
  });
};
