import z from "zod";

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  username: z
    .string()
    .min(3, "username must be at least 3 characters")
    .max(60, "username must be at most 60 characters")
    .regex(
      /^[a-z0-9][a-z0-9]*[a-z0-9]$/,
      "Username can only contains lowercase letters, numbers and hyphens. Start and end with a letter or number",
    )
    .refine(
      (val) => !val.includes("--"),
      "Username can not contain consecutive hyphens",
    )
    .transform((val) => val.toLowerCase()),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
