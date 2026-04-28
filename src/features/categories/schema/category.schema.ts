import z from "zod"

export const categorySchema = z.object({
    name: z.string().trim().min(1, { error: "Category is required" }).max(100),
});

export const categoryResponseSchema = categorySchema.extend({
    id: z.number(),
    name: z.string(),
    global: z.boolean(),
});


export type CategoryData = z.infer<typeof categorySchema>;
export type CategoryResponse = z.infer<typeof categoryResponseSchema>;