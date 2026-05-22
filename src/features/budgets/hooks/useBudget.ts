import { toast } from "@heroui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { HTTPError } from "ky";

import { budgetService } from "../api/budget.service";
import { BudgetData } from "../schema/budget.schema";

export function useBudgets(month: number, year: number) {
    return useQuery({
        queryKey: ["budgets", month, year],
        queryFn: () => budgetService.getAll(month, year),
    });
}

export function useCreateBudget() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: BudgetData) => {
            return budgetService.create(data);
        },
        onSuccess: () => {
            // invalida el cache, para obtener datos actualizados
            queryClient.invalidateQueries({ queryKey: ["budgets"] });
            toast.success("Budget registered successfully");
        },
        onError: (error: unknown) => {
            if (error instanceof HTTPError) {
                toast.danger(error.data?.error || "Failed to create budget");
            } else {
                toast.danger("An unexpected error occurred");
            }
        }
    })
}

export function useUpdateBudget() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ budgetId, data }: { budgetId: number, data: BudgetData }) => {
            return budgetService.update(budgetId, data);
        },
        onSuccess: () => {
            // invalida el cache, para obtener datos actualizados
            queryClient.invalidateQueries({ queryKey: ["budgets"] });
            toast.success("Budget updated successfully");
        },
        onError: (error: unknown) => {
            if (error instanceof HTTPError) {
                toast.danger(error.data?.error || "Failed to update budget");
            } else {
                toast.danger("An unexpected error occurred");
            }
        }
    })
}