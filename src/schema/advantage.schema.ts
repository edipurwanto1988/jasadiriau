import z from "./zod.schema";

import { StatusType } from "@/generated/prisma";

export const createAdvantageSchema = z.object({
  title: z.string().nonempty(),
  description: z.string().nonempty(),
  icon: z.string().optional().nullish(),
  sortOrder: z.number().optional().nullish(),
  status: z
    .enum(Object.values(StatusType) as [string, ...string[]])
    .default(StatusType.inactive),
});

export type CreateAdvantageSchema = z.infer<typeof createAdvantageSchema>;

export const updateAdvantageSchema = createAdvantageSchema.extend({
  id: z.number().int().nonoptional(),
});

export type UpdateAdvantageSchema = z.infer<typeof updateAdvantageSchema>;
