import z from "zod";

import { api } from "@/core/config/api";

import { BudgetData, BudgetResponse, budgetResponseSchema } from "../schema/budget.schema";

export const budgetService = {
    create: async (formData: BudgetData): Promise<BudgetResponse> => {
        const data = await api
            .post("api/v1/budgets", {
                json: formData,
            })
            .json();

        return budgetResponseSchema.parse(data);
    },

    getAll: async (month: number, year: number): Promise<BudgetResponse[]> => {
        const data = await api
            .get("api/v1/budgets", {
                searchParams: {
                    month: month,
                    year: year
                }
            })
            .json();

        return z.array(budgetResponseSchema).parse(data);
    },

    update: async (id: number, formData: BudgetData): Promise<BudgetResponse> => {
        // actualización parcial
        const data = await api
            .patch(`api/v1/budgets/${id}`, {
                json: formData,
            })
            .json();

        return budgetResponseSchema.parse(data);
    }
}