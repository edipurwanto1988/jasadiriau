import z from "./zod.schema";

import { Role } from "@/generated/prisma";

export const createUserSchema = z.object({
  name: z.string().nonempty(),
  email: z.email().nonempty(),
  password: z.string().optional().nullish(),
  isActive: z.boolean().optional().nullish().default(false),
  role: z
    .enum(Object.values(Role) as [string, ...string[]])
    .optional()
    .nullish()
    .default(Role.user),
});

export type CreateUserSchema = z.infer<typeof createUserSchema>;

export const updateUserSchema = createUserSchema.extend({
  id: z.coerce.number().int().nonoptional(),
});

export type UpdateUserSchema = z.infer<typeof updateUserSchema>;

export const updateRoleSchema = updateUserSchema.pick({ id: true, role: true });

export type UpdateRoleSchema = z.infer<typeof updateRoleSchema>;