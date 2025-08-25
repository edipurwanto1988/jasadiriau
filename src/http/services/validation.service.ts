import prisma from "@/lib/db";
import {
  CreateValidationSchema,
  UpdateValidationSchema,
} from "@/schema/validation.schema";
import dayjs from "dayjs";
import {
  addAdminNotification,
  addUserNotification,
} from "./notification.service";

export const createValidation = (payload: CreateValidationSchema) => {
  return prisma.$transaction(async (tx) => {
    if (payload.targetType === "profile") {
      const business = await tx.businessProfile.update({
        where: { id: payload.targetId },
        data: { status: "pending" },
      });

      await addAdminNotification(
        tx,
        {
          type: "business-profile",
          id: business.id,
        },
        "admin.profilePending",
        { businessName: business.businessName }
      );
    } else if (payload.targetType === "service") {
      const service = await tx.service.update({
        where: { id: payload.targetId },
        data: { status: "pending" },
        include: {
          businessProfile: {
            select: {
              businessName: true,
            },
          },
        },
      });

      await addAdminNotification(
        tx,
        {
          type: "service",
          id: service.id,
        },
        "admin.servicePending",
        {
          businessName: service.businessProfile.businessName,
          serviceName: service.name,
        }
      );
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
      const business = await tx.businessProfile.update({
        where: { id: validated.targetId },
        data: {
          status: payload.action === "approved" ? "active" : "inactive",
        },
      });

      await addUserNotification(
        tx,
        {
          type: "business-profile",
          id: business.id,
          userId: business.userId!,
        },
        payload.action === "approved"
          ? "user.profileApproved"
          : "user.profileRejected",
        { businessName: business.businessName }
      );
    }

    if (validated.targetType === "service") {
      const service = await tx.service.update({
        where: { id: validated.targetId },
        data: {
          status: payload.action === "approved" ? "active" : "inactive",
        },
        include: {
          businessProfile: {
            select: {
              userId: true,
              businessName: true,
            },
          },
        },
      });

      await addUserNotification(
        tx,
        {
          type: "service",
          id: service.id,
          userId: service.businessProfile.userId!,
        },
        payload.action === "approved"
          ? "user.serviceApproved"
          : "user.serviceRejected",
        {
          businessName: service.businessProfile.businessName,
          serviceName: service.name,
        }
      );
    }

    return validated;
  });
};
