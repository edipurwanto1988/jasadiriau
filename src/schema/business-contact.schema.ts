import * as z from "zod";

export const createBusinessContactSchema = z.object({
  whatsappNumber: z.string(),
});

export type CreateBusinessContactSchema = z.infer<
  typeof createBusinessContactSchema
>;

export const updateBusinessContactSchema = createBusinessContactSchema.extend({
  id: z.number().int().nonoptional(),
});

export type UpdateBusinessContactSchema = z.infer<
  typeof updateBusinessContactSchema
>;
