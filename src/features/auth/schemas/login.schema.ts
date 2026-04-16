import z from "zod";

export const loginSchema = z.object({
  email: z
    .email({ error: "Invalid email address" })
    .trim()
    .toLowerCase()
    .min(1, { error: "Email is required" }),
  password: z
    .string()
    .min(8, { error: "Password must be at least 8 characters" }),
});

export type LoginFormData = z.infer<typeof loginSchema>;
