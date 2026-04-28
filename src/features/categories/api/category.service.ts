import z from "zod";

import { api } from "@/core/config/api";

import { CategoryData, CategoryResponse, categoryResponseSchema } from "../schema/category.schema";


export const categoryService = {
    getAll: async (): Promise<CategoryResponse[]> => {
        const data = await api
            .get("api/v1/categories")
            .json();

        return z.array(categoryResponseSchema).parse(data);
    },
    create: async (formData: CategoryData): Promise<CategoryResponse> => {
        const data = await api
            .post("api/v1/categories", {
                json: formData,
            })
            .json();

        return categoryResponseSchema.parse(data);
    }
}