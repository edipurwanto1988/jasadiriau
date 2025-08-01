import * as z from "zod";

export const createCatgorySchema = z.object({
  name: z.string().nonempty().nonoptional(),
  slug: z.string().nonempty().nonoptional(),
  parentId: z.number().optional(),
});

export type CreateCategorySchema = z.infer<typeof createCatgorySchema>;

export const updateCategorySchema = createCatgorySchema.extend({
  id: z.number().nonoptional(),
});

export type UpdateCategorySchema = z.infer<typeof updateCategorySchema>
