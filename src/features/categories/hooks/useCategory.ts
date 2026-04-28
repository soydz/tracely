import { toast } from "@heroui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { HTTPError } from "ky";

import { categoryService } from "../api/category.service";
import { CategoryData } from "../schema/category.schema";

export function useCategory() {
    return useQuery({
        queryKey: ["categories"],
        queryFn: () => categoryService.getAll(),
    })
}

export function useCreateCategory() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: CategoryData) => {
            return categoryService.create(data);
        },
        onSuccess: () => {
            // actualización forzosa
            queryClient.invalidateQueries({ queryKey: ["categories"] });
        },
        onError: (error: unknown) => {
            if (error instanceof HTTPError) {
                toast.danger(error.data?.error);
            } else {
                toast.danger("An unexpected error occurred");
            }
        }
    })
}