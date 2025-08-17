import z from "./zod.schema";

export const inputSettingSchema = z.object({
  siteName: z.string(),
  logo: z.string().optional().nullish(),
  description: z.string().optional().nullish(),
  metaKeywords: z.string().optional().nullish(),
  metaTitle: z.string(),
  metaDescription: z.string(),
  ogTitle: z.string().optional().nullish(),
  ogDescription: z.string().optional().nullish(),
  googleSiteVerification: z.string().optional().nullish(),
  contactEmail: z.string().optional().nullish(),
  contactPhone: z.string().optional().nullish(),
  address: z.string().optional().nullish(),
  facebookUrl: z.string().optional().nullish(),
  instagramUrl: z.string().optional().nullish(),
  twitterUrl: z.string().optional().nullish(),
  linkedinUrl: z.string().optional().nullish(),
  youtubeUrl: z.string().optional().nullish(),
  whatsappUrl: z.string().optional().nullish(),
});

export type InputSettingSchema = z.infer<typeof inputSettingSchema>;
