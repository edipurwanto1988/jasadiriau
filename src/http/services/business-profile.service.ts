import prisma from "@/lib/db";
import { NotFoundException } from "@/utils/exception";
import {
  CreateAccountBusinessProfileSchema,
  UpdateAccountBusinessProfileSchema,
} from "@/schema/business-profile.schema";
import { Platform, Prisma, StatusType } from "@/generated/prisma";
import { paginate } from "@/utils/format";
import { addAdminNotification } from "./notification.service";
import { slugify } from "@/utils/string";
import dayjs from "dayjs";

export const businessProfilePaginate = async (
  qs: URLSearchParams,
  userId?: number
) => {
  const where: Prisma.BusinessProfileWhereInput = {
    ...(qs.has("status") && { status: qs.get("status") as StatusType }),
    ...(userId && { userId }),
    ...(qs.has("name") && {
      businessName: {
        contains: String(qs.get("name")),
        mode: "insensitive",
      },
    }),
  };
  const count = await prisma.businessProfile.count({ where });

  const results = await prisma.businessProfile.findMany({
    where,
    include: {
      User: true,
      BusinessContact: true,
      _count: {
        select: {
          Service: true,
        },
      },
    },
    ...paginate(qs),
    orderBy: {
      [qs.get("orderBy") ?? "id"]: qs.get("order") ?? "desc",
    },
  });

  const images = await prisma.image.findMany({
    where: {
      entityId: {
        in: results.map((v) => v.id),
      },
      entityType: "profile",
    },
  });

  const newResult = results.map((val) => {
    const image = images.find((f) => f.entityId === val.id);
    if (image) {
      Object.assign(val, { imageUrl: image.imageUrl });
    }
    return val;
  });

  return {
    total: count,
    data: newResult,
  };
};

export const getBusinessProfileID = async (id: number) => {
  const model = await prisma.businessProfile.findFirst({
    where: { id },
    include: {
      BusinessContact: true,
      BusinessSocial: true,
      User: true,
      Service: {
        include: {
          category: {
            select: {
              name: true,
            },
          },
          businessProfile: {
            select: {
              businessName: true,
            },
          },
        },
      },
      BusinessLocation: {
        include: {
          province: true,
          regency: true,
          district: true,
        },
      },
    },
  });
  if (!model) {
    throw new NotFoundException("BusinessProfile");
  }

  const image = await prisma.image.findFirst({
    where: { entityId: model.id, entityType: "profile" },
  });
  Object.assign(model, { imageUrl: image?.imageUrl });
  const validations = await prisma.validation.findMany({
    where: { targetId: model.id, targetType: "profile" },
    orderBy: { createdAt: "desc" },
  });
  Object.assign(model, { validations: validations });
  return model;
};

export const deleteBusinessProfile = (id: number) => {
  return prisma.businessProfile.delete({ where: { id } });
};

export const createAccountBusinessProfile = (
  userId: number,
  {
    businessContact,
    businessSocial,
    businessLocation,
    ...payload
  }: CreateAccountBusinessProfileSchema
) => {
  return prisma.$transaction(async (tx) => {
    let number = 1;
    const last = await tx.businessProfile.findFirst({
      where: { slug: { not: null } },
      orderBy: { slug: "desc" },
    });

    if (last && last.slug) {
      const [currNum] = last.slug.split("-");
      number = Number(currNum) + 1;
    }

    const padStart = String(number).padStart(4, "0");
    const data: Prisma.BusinessProfileUncheckedCreateInput = {
      ...payload,
      userId,
      slug: slugify(`${padStart} ${payload.businessName}`),
      status: StatusType.pending,
      BusinessContact: {
        createMany: {
          data: businessContact.map((val) => ({
            ...val,
            whatsappNumber: `62${val.whatsappNumber.trim()}`,
          })),
        },
      },
      BusinessSocial: {
        createMany: {
          data: businessSocial.map((val) => ({
            ...val,
            platform: val.platform as Platform,
          })),
        },
      },
      BusinessLocation: {
        createMany: {
          data: businessLocation,
        },
      },
    };
    const profile = await tx.businessProfile.create({ data });
    await tx.validation.create({
      data: {
        targetType: "profile",
        targetId: profile.id,
      },
    });

    await addAdminNotification(
      tx,
      {
        type: "business-profile",
        id: profile.id,
      },
      "admin.profilePending",
      { businessName: profile.businessName }
    );
    return profile;
  });
};

export const updateAccountBusinessProfile = ({
  id,
  businessContact,
  businessSocial,
  businessLocation,
  ...payload
}: UpdateAccountBusinessProfileSchema) => {
  return prisma.$transaction(async (tx) => {
    const current = await tx.businessProfile.findFirstOrThrow({
      where: { id },
      select: { slug: true },
    });

    let slug = current.slug;
    if (current.slug) {
      const number = current.slug.split("-").at(0);
      if (number) {
        slug = slugify(`${number} ${payload.businessName}`);
      }
    }

    const data: Prisma.BusinessProfileUpdateInput = {
      ...payload,
      slug,
    };

    for (const { id, ...contact } of businessContact) {
      if (id) {
        await tx.businessContact.update({ data: contact, where: { id } });
      }
    }

    for (const { id, ...social } of businessSocial) {
      if (id) {
        await tx.businessSocial.update({
          data: { ...social, platform: social.platform as Platform },
          where: { id },
        });
      }
    }

    await tx.businessLocation.deleteMany({
      where: {
        id: { notIn: businessLocation.filter((v) => !!v.id).map((v) => v.id!) },
        profileId: id,
      },
    });

    for (const { id: locId, ...location } of businessLocation) {
      if (locId) {
        await tx.businessLocation.update({
          data: location,
          where: { id: locId },
        });
      } else {
        await tx.businessLocation.create({
          data: {
            ...location,
            profileId: id,
          },
        });
      }
    }

    return tx.businessProfile.update({
      where: { id: +id! },
      data,
    });
  });
};

export const getMeta = async () => {
  const totalPending = await prisma.businessProfile.count({
    where: { status: "pending" },
  });

  return {
    totalPending,
  };
};

export const getBusinessInteractive = async (qs: URLSearchParams) => {
  const page = parseInt(qs.get("page") || "0", 10);
  const perPage = parseInt(qs.get("per_page") || "25", 10);
  const offset = page * perPage;
  const date = dayjs();

  const start_date = qs.get("start_date") ?? date.startOf("month");
  const end_date = qs.get("end_date") ?? date.endOf("month");

  const ids = qs.get("ids")
    ? Prisma.sql`AND s.id IN (${Prisma.join(
        qs.get("ids")!.split(",").map(Number)
      )})`
    : Prisma.empty;

  const baseSql = Prisma.sql`
  WITH
  business_views AS (
    SELECT 
     bp.id,
     bp.business_name AS name,
     MAX(DATE(bv.created_at)) AS date,
     COUNT(bv.id)::INT AS total
    FROM business_profiles bp
    LEFT JOIN business_views bv ON bv.profile_id = bp.id AND DATE(bv.created_at) BETWEEN ${Prisma.sql`DATE(${start_date})`} AND ${Prisma.sql`DATE(${end_date})`} 
    WHERE bp.status = 'active'
    ${ids}
    GROUP BY bp.id, DATE(bv.created_at)
  ),
  business_format AS (
    SELECT 
      bv.id,
      bv.name,
      SUM(bv.total)::INT AS total,
      COALESCE(json_agg(
        jsonb_build_object(
          'date', bv.date,
          'total', bv.total
        ) ORDER BY bv.date 
      ) FILTER (WHERE bv.date IS NOT NULL), '[]') AS views
    FROM business_views bv
    GROUP BY bv.id, bv.name
  )
  `;

  const [[{ total }], data] = await prisma.$transaction<[any, any]>([
    prisma.$queryRaw(Prisma.sql`
        ${baseSql}
        SELECT COUNT(*)::INT AS total FROM business_format;
    `),
    prisma.$queryRaw(Prisma.sql`
       ${baseSql}
        SELECT 
          * ,
          (SELECT count(bv.id)::INT FROM public.business_views bv WHERE bv.profile_id = business_format.id) AS all
        FROM business_format
        ORDER BY 
          total ${Prisma.raw(`${qs.get("order") ?? "DESC"}`)}
        LIMIT 
          ${perPage} 
        OFFSET 
          ${offset}
    `),
  ]);

  return { total, data };
};
