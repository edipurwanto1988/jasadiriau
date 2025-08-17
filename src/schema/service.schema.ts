import z from "./zod.schema";

import { StatusType } from "@/generated/prisma";

export const createServiceSchema = z.object({
  name: z.string(),
  slug: z.string().optional().nullish(),
  description: z.string().optional().nullish(),
  price: z.number().optional().nullish().default(0),
  categoryId: z.number(),
  seoConfigId: z.number().optional().nullish(),
  profileId: z.number(),
  status: z
    .enum(Object.values(StatusType) as [string, ...string[]])
    .default(StatusType.pending),
  terms: z.string().optional().nullish(),
});

export type CreateServiceSchema = z.infer<typeof createServiceSchema>;

export const updateServiceSchema = createServiceSchema.extend({
  id: z.number().int().nonoptional(),
});

export type UpdateServiceSchema = z.infer<typeof updateServiceSchema>;
