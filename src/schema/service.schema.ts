import z from "./zod.schema";


export const createServiceSchema = z.object({
  name: z.string().nonempty().nonoptional(),
  description: z.string().optional().nullish(),
  price: z.coerce.number().optional().nullish().default(0),
  categoryId: z.coerce.number().min(1, 'Field ini wajib diisi'),
  profileId: z.coerce.number().min(1, 'Field ini wajib diisi'),
  terms: z.string().optional().nullish(),
});

export type CreateServiceSchema = z.infer<typeof createServiceSchema>;

export const updateServiceSchema = createServiceSchema.extend({
  id: z.coerce.number().int().nonoptional(),
});

export type UpdateServiceSchema = z.infer<typeof updateServiceSchema>;
