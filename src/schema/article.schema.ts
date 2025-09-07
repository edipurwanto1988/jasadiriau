import z from "./zod.schema";

export const createArticleSchema = z.object({
  title: z.string().nonempty().nonoptional(),
  metaDescription: z.string().nullish(),
  metaKeywords: z.string().nullish(),
  content: z.string().optional(),
  file: z.instanceof(Blob).optional(),
  categoryId: z.coerce.number().nullish(),
  status: z
    .enum(["pending", "active", "inactive"])
    .default("pending")
    .nullish(),
});

export type CreateArticleSchema = z.infer<typeof createArticleSchema>;

export const updateArticleSchema = createArticleSchema.extend({
  id: z.coerce.number().int().nonoptional(),
});

export type UpdateArticleSchema = z.infer<typeof updateArticleSchema>;
