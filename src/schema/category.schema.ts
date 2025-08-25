import z from "./zod.schema";

export const createCatgorySchema = z.object({
  name: z.string().nonempty().nonoptional(),
  file: z.instanceof(Blob).optional(),
  parentId: z.number().optional(),
});

export type CreateCategorySchema = z.infer<typeof createCatgorySchema>;

export const updateCategorySchema = createCatgorySchema.extend({
  id: z.coerce.number().nonoptional(),
});

export type UpdateCategorySchema = z.infer<typeof updateCategorySchema>;
