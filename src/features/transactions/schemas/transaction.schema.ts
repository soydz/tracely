import z from "zod"

export const transactionSchema = z.object({
    description: z.string().min(1, { error: "Description is required" }).max(100),
    amount: z.number().positive("Amount is required"),
    type: z.enum(["INCOME", "EXPENSE"]),
    category: z.string().min(1, { error: "Category is required" }),
    transactionDate: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/, "Invalid format. Expected: YYYY-MM-DD")
            .refine((val) => !Number.isNaN(new Date(val).getTime()), { message: "Invalid date" })
            .refine((val) => new Date(val + "Z").getTime() <= Date.now(), { message: "The date cannot be in the future" }),
            notes: z.string().optional(),
});

export const transactionResponseSchema = transactionSchema.extend({
    id: z.number(),
    createdAt: z.coerce.date()
})

export type TransactionData = z.infer<typeof transactionSchema>;
export type TransactionResponse = z.infer<typeof transactionResponseSchema>;