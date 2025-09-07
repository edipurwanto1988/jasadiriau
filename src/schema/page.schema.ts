import z from "./zod.schema";

export const createPageSchema = z.object({
  title: z.string().nonempty().nonoptional(),
  metaDescription: z.string().nullish(),
  metaKeywords:z.string().nullish(),
  content: z.string().optional(),
  status: z.enum(['pending', 'active', 'inactive']).default("pending").nullish()
});

export type CreatePageSchema = z.infer<typeof createPageSchema>;

export const updatePageSchema = createPageSchema.extend({
  id: z.coerce.number().int().nonoptional(),
});

export type UpdatePageSchema = z.infer<typeof updatePageSchema>;
