import z from "zod";

export const budgetSchema = z.object({
    categoryId: z.coerce.number().positive("Category is required"),
    limitAmount: z.coerce.number().positive({ error: "Limit amount must be greater than 0" }),
    month: z.coerce.number().min(1, { error: "Month must be between 1 and 12" })
        .max(12, { error: "Month must be between 1 and 12" })
        .optional(),
    year: z.coerce.number().int().positive({ error: "Year must be a positive number" }).optional(),
});

export const budgetResponseSchema = budgetSchema
    .omit({
        categoryId: true,
    })
    .extend({
        id: z.number(),
        categoryName: z.string(),
        spent: z.number(),
    });

export type BudgetData = z.infer<typeof budgetSchema>;
export type BudgetResponse = z.infer<typeof budgetResponseSchema>;
