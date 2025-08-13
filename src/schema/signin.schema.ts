import { z } from "zod";

export const SigninFormSchema = z.object({
  email: z.email({ message: "Alamat email tidak valid" }).trim(),
  password: z
    .string()
    .trim()
    .nonempty({ message: "Kata sandi tidak boleh kosong" }),
});

export type FormState =
  | {
      errors?: {
        email?: string;
        password?: string;
      };
      message?: string;
    }
  | undefined;
