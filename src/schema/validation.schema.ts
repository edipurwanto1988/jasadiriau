import z from "./zod.schema";

export const createValidationSchema = z.object({
  targetId: z.coerce.number(),
  targetType: z.enum(["profile", "service"]),
});

export type CreateValidationSchema = z.infer<typeof createValidationSchema>;

export const updateValidationSchema = z.object({
  id: z.number(),
  action: z.enum(["approved", "rejected"]),
  note: z.string().optional().nullish(),
});

export type UpdateValidationSchema = z.infer<typeof updateValidationSchema>;
