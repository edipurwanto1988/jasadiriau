import z from "./zod.schema";

export const createImageSchema = z.object({
  entityType: z.string().default("profile"),
  entityId: z.coerce.number(),
  file: z.instanceof(Blob).nonoptional().nullable(),
});

export type CreateImageSchema = z.infer<typeof createImageSchema>;


export const createMultiImageSchema = z.object({
  entityType: z.string().default("profile"),
  entityId: z.coerce.number(),
  files: z.array(z.instanceof(Blob)).nonempty()
});

export type CreateMultiImageSchema = z.infer<typeof createMultiImageSchema>;
