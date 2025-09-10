import z from "./zod.schema";

export const createContacClickSchema = z.object({
  visitorId: z.string().nullish(),
  contactId: z.coerce.number(),
  phoneNumber: z.string().nullish(),
  source: z.string().nullish(),
  userAgent: z.string().nullish(),
  ipAddress: z.string().nullish(),
});

export type CreateContacClickSchema = z.infer<typeof createContacClickSchema>;

export const createBusinessViewSchema = z.object({
  visitorId: z.string().nullish(),
  profileId: z.coerce.number(),
  source: z.string().nullish(),
  userAgent: z.string().nullish(),
  ipAddress: z.string().nullish(),
});

export type CreateBusinessViewSchema = z.infer<typeof createBusinessViewSchema>;

export const createServiceViewSchema = z.object({
  visitorId: z.string().nullish(),
  serviceId: z.coerce.number(),
  source: z.string().nullish(),
  userAgent: z.string().nullish(),
  ipAddress: z.string().nullish(),
});

export type CreateServiceViewSchema = z.infer<typeof createServiceViewSchema>;
