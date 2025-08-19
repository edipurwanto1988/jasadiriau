import z from "./zod.schema";

export const updateValidationSchema = z.object({
  id: z.number(),
  action: z.enum(["approved", "rejected"]),
  note: z.string().optional().nullish(),
});

export type UpdateValidationSchema = z.infer<typeof updateValidationSchema>;
