import { z } from "zod";

export const regSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, { message: "Password cannot be less than 8 characters" }),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, {
    message:
      "Invalid phone number format. The phone number must start with an optional '+' and contain 2-15 digits.",
  }),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, { message: "Password cannot be less than 8 characters" }),
});

export const passwordSchema = z.object({
  password: z
    .string()
    .min(8, { message: "Password cannot be less than 8 characters" }),
});
