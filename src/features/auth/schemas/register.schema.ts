import z from "zod"

export const registerSchema = z.object({
    fullName: z.string().min(3, { error: "Name must be at least 3 characters long" }),
    email: z.email().trim().toLowerCase().min(1, { error: "Email is required" }),
    password: z.string()
        .min(8, { error: "Password must be at least 8 characters" })
        .regex(/[A-Z]/, { error: "Must contain at least one uppercase letter" })
        .regex(/[a-z]/, { error: "Must contain at least one lowercase letter" })
        .regex(/\d/, { error: "Must contain at least one number." })
        .regex(/[^A-Za-z0-9]/, { error: "Must contain at least one special character." }),
    confirmPassword: z.string().min(1, { error: "Please confirm your password" }),
})
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    })

export type RegisterFormData = z.infer<typeof registerSchema>;
