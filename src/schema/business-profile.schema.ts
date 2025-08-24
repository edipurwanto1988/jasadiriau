import z from "./zod.schema";

import { StatusType } from "@/generated/prisma";
import { createBusinessSocialSchema } from "./business-social.schema";
import { createBusinessContactSchema } from "./business-contact.schema";
import { createUserSchema } from "./user.schema";
import { createBusinessLocationSchema } from "./business-location.schema";

export const createBusinessProfileSchema = z.object({
  businessName: z.string().nonempty(),
  description: z.string().optional().nullish(),
  websiteUrl: z.preprocess(
    (val) => (!val ? undefined : val),
    z.url().optional().nullish()
  ),
  status: z
    .enum(Object.values(StatusType) as [string, ...string[]])
    .default(StatusType.inactive),
  businessSocial: z.array(createBusinessSocialSchema),
  businessContact: z.array(createBusinessContactSchema),
  user: createUserSchema,
  businessLocation: z.array(createBusinessLocationSchema),
});

export type CreateBusinessProfileSchema = z.infer<
  typeof createBusinessProfileSchema
>;

export const updateBusinessProfileSchema = createBusinessProfileSchema.extend({
  id: z.coerce.number().int().nonoptional(),
  businessSocial: z.array(
    createBusinessSocialSchema.extend({
      id: z.coerce.number().int().optional().nullish(),
    })
  ),
  businessContact: z.array(
    createBusinessContactSchema.extend({
      id: z.coerce.number().int().optional().nullish(),
    })
  ),
  user: createUserSchema.extend({
    id: z.coerce.number().int().optional().nullish(),
  }),
  businessLocation: z.array(
    createBusinessLocationSchema.extend({
      id: z.coerce.number().int().optional().nullish(),
    })
  ),
});

export type UpdateBusinessProfileSchema = z.infer<
  typeof updateBusinessProfileSchema
>;

export const createAccountBusinessProfileSchema =
  createBusinessProfileSchema.omit({ user: true, status: true });

export type CreateAccountBusinessProfileSchema = z.infer<
  typeof createAccountBusinessProfileSchema
>;

export const updateAccountBusinessProfileSchema = updateBusinessProfileSchema
  .omit({ user: true, status: true })
  .extend({
    id: z.coerce.number().int().nonoptional(),
    businessSocial: z.array(
      createBusinessSocialSchema.extend({
        id: z.coerce.number().int().optional().nullish(),
      })
    ),
    businessContact: z.array(
      createBusinessContactSchema.extend({
        id: z.coerce.number().int().optional().nullish(),
      })
    ),
    businessLocation: z.array(
      createBusinessLocationSchema.extend({
        id: z.coerce.number().int().optional().nullish(),
      })
    ),
  });

export type UpdateAccountBusinessProfileSchema = z.infer<
  typeof updateAccountBusinessProfileSchema
>;
