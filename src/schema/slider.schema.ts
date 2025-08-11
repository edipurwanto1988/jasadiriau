import * as z from "zod";

import { StatusType } from "@/generated/prisma";

export const createSliderSchema = z.object({
  title: z.string().nonempty().nonoptional(),
  caption: z.string().optional().nullish(),
  link: z.string().optional().nullish(),
  sortOrder: z.coerce.number().int().optional().nullish(),
  file: z.instanceof(Blob).nonoptional(),
  status: z
    .enum(Object.values(StatusType) as [string, ...string[]])
    .default(StatusType.inactive),
});

export type CreateSliderSchema = z.infer<typeof createSliderSchema>;

export const updateSliderSchema = createSliderSchema.extend({
  id: z.coerce.number().int().nonoptional(),
  file: z.file().optional().nullish(),
});

export type UpdateSliderSchema = z.infer<typeof updateSliderSchema>;
