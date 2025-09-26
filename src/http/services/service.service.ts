import prisma from "@/lib/db";
import { NotFoundException } from "@/utils/exception";
import {
  CreateServiceSchema,
  UpdateServiceSchema,
} from "@/schema/service.schema";
import { Prisma, StatusType } from "@/generated/prisma";
import { paginate } from "@/utils/format";
import { addAdminNotification } from "./notification.service";
import { slugify } from "@/utils/string";
import dayjs from "dayjs";

export const servicePaginate = async (qs: URLSearchParams, userId?: number) => {
  const where: Prisma.ServiceWhereInput = {
    ...(qs.has("status") && { status: qs.get("status") as StatusType }),
    ...(userId && {
      businessProfile: {
        userId,
      },
    }),
    ...(qs.has("name") && {
      name: {
        contains: String(qs.get("name")),
        mode: "insensitive",
      },
    }),
    ...(qs.has("ctg") && {
      categoryId: Number(qs.get("ctg")),
    }),
    ...(qs.has("profile") && {
      businessProfile: {
        businessName: {
          contains: String(qs.get("profile")),
          mode: "insensitive",
        },
      },
    }),
  };
  const count = await prisma.service.count({ where });
  const results = await prisma.service.findMany({
    include: {
      businessProfile: { select: { businessName: true } },
      category: { select: { name: true } },
    },
    where,
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
      entityType: "service",
    },
  });

  const newResult = results.map((val) => {
    const image = images.find((f) => f.entityId === val.id);
    if (image) {
      Object.assign(val, { imageUrl: image.imageUrl });
    }
    return val;
  });
  return { total: count, data: newResult };
};

export const getServiceID = async (id: number) => {
  const model = await prisma.service.findFirst({
    where: { id },
    include: {
      businessProfile: { select: { businessName: true } },
      category: { select: { name: true } },
    },
  });
  if (!model) {
    throw new NotFoundException("Record");
  }

  const image = await prisma.image.findFirst({
    where: { entityId: model.id, entityType: "service" },
  });
  Object.assign(model, { imageUrl: image?.imageUrl });
  const validations = await prisma.validation.findMany({
    where: { targetId: model.id, targetType: "service" },
    orderBy: { createdAt: "desc" },
  });
  Object.assign(model, { validations: validations });
  const images = await prisma.image.findMany({
    where: { entityId: model.id, entityType: "gallery_service" },
  });
  Object.assign(model, { images: images });
  return model;
};

export const createService = (payload: CreateServiceSchema) => {
  return prisma.$transaction(async (tx) => {
    let number = 1;
    const last = await tx.service.findFirst({
      where: { slug: { not: null } },
      orderBy: { slug: "desc" },
    });

    if (last && last.slug) {
      const [currNum] = last.slug.split("-");
      number = Number(currNum) + 1;
    }

    const padStart = String(number).padStart(4, "0");
    const created = await tx.service.create({
      data: {
        ...payload,
        status: "pending",
        slug: slugify(`${padStart} ${payload.name}`),
      },
      include: {
        businessProfile: {
          select: {
            businessName: true,
          },
        },
      },
    });

    await tx.validation.create({
      data: {
        targetType: "service",
        targetId: created.id,
      },
    });

    await addAdminNotification(
      tx,
      {
        type: "service",
        id: created.id,
      },
      "admin.servicePending",
      {
        businessName: created.businessProfile.businessName,
        serviceName: created.name,
      }
    );

    return created;
  });
};

export const updateService = async ({
  id,
  ...payload
}: UpdateServiceSchema) => {
  const current = await prisma.service.findFirstOrThrow({
    where: { id },
    select: { slug: true },
  });

  let slug = current.slug;
  if (current.slug) {
    const number = current.slug.split("-").at(0);
    if (number) {
      slug = slugify(`${number} ${payload.name}`);
    }
  }

  const updated = await prisma.service.update({
    where: { id: +id! },
    data: {
      ...payload,
      slug,
    },
  });

  return updated;
};

export const deleteService = (id: number) => {
  return prisma.service.delete({ where: { id } });
};

export const getServicePopuler = async () => {
  const sql = Prisma.sql`
    SELECT 
      s.id,
      MAX(s.name) AS name, 
      MAX(s.slug) AS slug, 
      MAX(s.price)::INT AS price,
      MAX(s.category_name) AS category_name
    FROM (
      SELECT 
        s.id,
        s.name, 
        s.slug, 
        s.price::INT,
        c.name AS category_name
      FROM services s
      LEFT JOIN categories c ON c.id = s.category_id
      WHERE s.status = 'active'
    ) AS s
    LEFT JOIN service_views sv ON sv.service_id = s.id
    GROUP BY s.id
    ORDER BY  count(sv.id)::INT DESC
    LIMIT 10
  `;

  const results = await prisma.$queryRaw<any[]>(sql);

  const images = await prisma.image.findMany({
    where: {
      entityType: "service",
      entityId: {
        in: results.map((v) => +v.id),
      },
    },
    orderBy: {
      id: "desc",
    },
    distinct: ["entityId"],
  });

  return results.map((v) => {
    const image = images.find((f) => f.entityId === +v.id);
    return {
      id: v.id,
      name: v.name,
      slug: v.slug,
      price: v.price,
      categoryName: v.category_name,
      imageUrl: `${process.env.NEXT_PUBLIC_BASE_URL}${
        image?.imageUrl ?? "/images/placeholder.webp"
      }`,
    };
  });
};

export const getServiceInteractive = async (qs: URLSearchParams) => {
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
  service_views AS (
    SELECT 
      s.id,
      s.name,
      MAX(DATE(sv.created_at)) AS date,
      COUNT(sv.id)::INT AS total
    FROM services s
    LEFT JOIN service_views sv ON sv.service_id = s.id AND DATE(sv.created_at) BETWEEN ${Prisma.sql`DATE(${start_date})`} AND ${Prisma.sql`DATE(${end_date})`} 
    WHERE s.status = 'active'
    ${ids}
    GROUP BY s.id, DATE(sv.created_at)
  ),
  service_format AS (
    SELECT 
      sv.id,
      sv.name,
      SUM(sv.total)::INT AS total,
      json_agg(
        jsonb_build_object(
          'date', sv.date,
          'total', sv.total
        ) ORDER BY sv.date
      ) AS views
    FROM service_views sv
    GROUP BY sv.id, sv.name
  )
  `;

  const [[{ total }], data] = await prisma.$transaction<[any, any]>([
    prisma.$queryRaw(Prisma.sql`
        ${baseSql}
        SELECT COUNT(*)::INT AS total FROM service_format;
    `),
    prisma.$queryRaw(Prisma.sql`
       ${baseSql}
        SELECT 
          * ,
          (SELECT count(sv.id)::INT FROM public.service_views sv WHERE sv.service_id = service_format.id) AS all
        FROM service_format
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

export const getServiceRelated = async (qs: URLSearchParams) => {
  const sql = Prisma.sql`
      SELECT 
        s.id,
        s.slug,
        s.name,
        s.price::INT AS price,
        c.name AS category_name
      FROM services s 
      LEFT JOIN categories c ON c.id = s.category_id
      LEFT JOIN business_profiles bp ON bp.id = s.profile_id
      
      WHERE 1=1
      ${
        qs.get("slug")
          ? Prisma.sql`AND s.slug != ${qs.get("slug")!}`
          : Prisma.empty
      }
      ${
        qs.get("categoryId")
          ? Prisma.sql`AND c.id = ${+qs.get("categoryId")!}`
          : Prisma.empty
      }
      ORDER BY RANDOM()
      LIMIT 8
    `;

  const relateds = await prisma.$queryRaw<
    {
      id: number;
      slug: string;
      name: string;
      price: number;
      category_name: string;
      image_url?: string;
    }[]
  >(sql);

  const images = await prisma.image.findMany({
    where: {
      entityId: {
        in: relateds.map((v) => v.id),
      },
      entityType: "service",
    },
  });

  const newResult = relateds.map((val) => {
    const image = images.find((f) => f.entityId === val.id);
    return {
      ...val,
        image_url: image?.imageUrl ?? "/images/placeholder.webp",
    };
  });

  return newResult;
};
