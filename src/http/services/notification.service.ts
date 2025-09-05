import { Prisma, PrismaClient } from "@/generated/prisma";
import { DefaultArgs } from "@/generated/prisma/runtime/library";
import prisma from "@/lib/db";

type NotificationKey =
  | "admin.profilePending"
  | "admin.servicePending"
  | "user.profileApproved"
  | "user.profileRejected"
  | "user.serviceApproved"
  | "user.serviceRejected";

type NotificationParams = {
  "admin.profilePending": { businessName: string };
  "admin.servicePending": { businessName: string; serviceName: string };
  "user.profileApproved": { businessName: string };
  "user.profileRejected": { businessName: string };
  "user.serviceApproved": { businessName: string; serviceName: string };
  "user.serviceRejected": { businessName: string; serviceName: string };
};

const notifications: Record<
  NotificationKey,
  { title: string; message: string }
> = {
  "admin.profilePending": {
    title: "Profil Bisnis Pending",
    message: "Profil bisnis {{businessName}} menunggu persetujuan.",
  },
  "admin.servicePending": {
    title: "Layanan Pending",
    message:
      "Layanan {{serviceName}} dari {{businessName}} menunggu persetujuan.",
  },
  "user.profileApproved": {
    title: "Profil Bisnis Disetujui",
    message:
      "Selamat! Profil bisnis Anda ({{businessName}}) telah disetujui dan sekarang aktif.",
  },
  "user.profileRejected": {
    title: "Profil Bisnis Ditolak",
    message:
      "Mohon maaf, profil bisnis Anda ({{businessName}}) ditolak. Silakan lengkapi informasi sebelum mengajukan kembali.",
  },
  "user.serviceApproved": {
    title: "Layanan Disetujui",
    message:
      "Selamat! Layanan Anda ({{serviceName}}) dari bisnis {{businessName}} telah disetujui dan aktif.",
  },
  "user.serviceRejected": {
    title: "Layanan Ditolak",
    message:
      "Mohon maaf, layanan Anda ({{serviceName}}) dari bisnis {{businessName}} ditolak. Silakan periksa kembali detail sebelum mengajukan ulang.",
  },
};

const formatMessage = <K extends NotificationKey>(
  key: K,
  params: NotificationParams[K]
) => {
  const notif = notifications[key];

  const message = notif.message.replace(
    /{{(.*?)}}/g,
    (_, p) => (params as any)[p.trim()] ?? ""
  );

  return {
    title: notif.title,
    message,
  };
};

export const getNotification = (userId: number) => {
  return prisma.notification.findMany({
    where: { userId, isRead: false },
    orderBy: { createdAt: "desc" },
  });
};

export const addAdminNotification = async <K extends NotificationKey>(
  tx: Omit<
    PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
    "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"
  >,
  payload: { type: "business-profile" | "service"; id: number },
  key: K,
  params: NotificationParams[K]
) => {
  const notif = formatMessage(key, params);
  const admin = await tx.user.findMany({
    select: { id: true, name: true },
    where: { role: { in: ["admin", "operator"] } },
  });

  const data: Prisma.NotificationCreateManyInput[] = admin.map((v) => {
    return {
      type: payload.type,
      url: `/account/${payload.type}/${payload.id}`,
      isRead: false,
      userId: v.id,
      title: notif.title,
      message: notif.message,
    };
  });

  return tx.notification.createMany({ data: data });
};

export const addUserNotification = async <K extends NotificationKey>(
  tx: Omit<
    PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
    "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"
  >,
  payload: { type: "business-profile" | "service"; id: number; userId: number },
  key: K,
  params: NotificationParams[K]
) => {
  const notif = formatMessage(key, params);
  return tx.notification.create({
    data: {
      type: payload.type,
      url: `/account/${payload.type}/${payload.id}`,
      isRead: false,
      userId: payload.userId,
      title: notif.title,
      message: notif.message,
    },
  });
};

export const updateRead = (id: number) => {
  return prisma.notification.update({ where: { id }, data: { isRead: true } });
};
