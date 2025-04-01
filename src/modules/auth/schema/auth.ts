import { z } from "zod";

export const authSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, { message: "Username must be at least 3 characters" })
    .max(20, { message: "Username must not exceed 20 characters" }),
  password: z
    .string()
    .trim()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(20, { message: "Password must not exceed 20 characters" }),
});

export type AuthSchema = z.infer<typeof authSchema>;