import z from "./zod.schema";

export const createBusinessLocationSchema = z.object({
  address: z.string().optional().nullish().transform((v) => v === "" ? null : v),
  provinceId: z.coerce.number().int().min(1, 'Field wajib diisi'),
  regencyId: z.coerce.number().int().min(1, 'Field wajib diisi'),
  districtId: z.coerce.number().int().min(1, 'Field wajib diisi'),
});

export type CreateBusinessLocationSchema = z.infer<
  typeof createBusinessLocationSchema
>;

export const updateBusinessLocationSchema = createBusinessLocationSchema.extend(
  {
    id: z.number().int().nonoptional(),
  }
);

export type UpdateBusinessLocationSchema = z.infer<
  typeof updateBusinessLocationSchema
>;
