import z from "./zod.schema";

import { Platform } from "@/generated/prisma";

export const createBusinessSocialSchema = z.object({
  name: z.string().optional().nullish(),
  platform: z
    .enum(Object.values(Platform) as [string, ...string[]])
    .default(Platform.other),
  url: z.preprocess(
    (val) => (!val ? undefined : val),
    z.url().optional().nullish()
  ),
});

export type CreateBusinessSocialSchema = z.infer<
  typeof createBusinessSocialSchema
>;

export const updateBusinessSocialSchema = createBusinessSocialSchema.extend({
  id: z.number().int().nonoptional(),
});

export type UpdateBusinessSocialSchema = z.infer<
  typeof updateBusinessSocialSchema
>;
