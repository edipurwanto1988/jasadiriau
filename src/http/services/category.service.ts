import { Category, Prisma } from "@/generated/prisma";
import prisma from "@/lib/db";
import {
  CreateCategorySchema,
  UpdateCategorySchema,
} from "@/schema/category.schema";
import { paginate } from "@/utils/format";
import { slugify } from "@/utils/string";

export const createCategory = ({
  url,
  ...payload
}: Omit<CreateCategorySchema, "file"> & { url?: string }) => {
  return prisma.$transaction(async (tx) => {
    const sc = await tx.seoConfigs.create({ data: { title: payload.name } });
    return tx.category.create({
      data: {
        ...payload,
        slug: slugify(payload.name),
        seoConfigId: sc.id,
        imageUrl: url,
      },
    });
  });
};

export const categoryPaginate = (qs: URLSearchParams) => {
  const where: Prisma.CategoryWhereInput = {
    parentId: null,
  };

  return Promise.all([
    prisma.category.count({ where }),
    prisma.category.findMany({
      where,
      include: { children: true },
      ...paginate(qs),
    }),
  ]);
};

export const categoryAll = () => {
  const where: Prisma.CategoryWhereInput = {
    parentId: null,
  };

  return prisma.category.findMany({
    where,
    include: { children: true },
    orderBy: { name: "asc" },
  });
};

export const categoryDetail = (id: number) => {
  return prisma.category.findFirstOrThrow({
    where: { id },
    include: { children: true },
  });
};

export const updateCategory = ({
  id,
  url,
  ...payload
}: Omit<UpdateCategorySchema, "file"> & { url?: string }) => {
  return prisma.$transaction(async (tx) => {
    const current = await tx.category.findFirstOrThrow({ where: { id } });

    let currentUrl = current.imageUrl;
    if (url) {
      currentUrl = url;
    }
    return tx.category.update({
      where: {
        id,
      },
      data: {
        ...payload,
        slug: slugify(payload.name),
        imageUrl: currentUrl,
      },
    });
  });
};

export const deleteCategory = (id: number) => {
  return prisma.category.delete({
    where: {
      id,
      children: {
        none: {
          parentId: id,
        },
      },
    },
  });
};

export const getCategoryPopuler = async () => {
  const sql = Prisma.sql`
    SELECT 
       c.name, c.slug, c.image_url 
    FROM categories c
    LEFT JOIN services s ON s.category_id = c.id
    LEFT JOIN service_views sv ON sv.service_id = s.id
    GROUP BY c.id
    ORDER BY  count(sv.id)::INT DESC
    LIMIT 10
  `;

  const results = await prisma.$queryRaw<any[]>(sql);
  return results.map((v) => ({
    name:v.name,
    slug:v.slug,
    imageUrl: `${process.env.NEXT_PUBLIC_BASE_URL}${
      v.image_url ?? "/images/placeholder.webp"
    }`,
  }));
};
