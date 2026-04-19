import z from "zod"

import { api } from "@/core/config/api";

import { TransactionData, TransactionResponse, transactionResponseSchema } from "../schemas/transaction.schema";

export const transactionService = {
    getAll: async (): Promise<TransactionResponse[]> => {
        const data = await api.
        get("api/v1/transactions")
        .json();

        // arreglo de transactions
        return z.array(transactionResponseSchema).parse(data);
    },
    create: async (formData: TransactionData): Promise<TransactionResponse> => {
        const data = await api
        .post("api/v1/transactions", {
            json: formData,
        })
        .json();

        return transactionResponseSchema.parse(data);
    },
    update: async (id: number, formData: Partial<TransactionData>): Promise<TransactionResponse> => {
        // patch para actualizaciones parciales - mejor practica
        const data = await api.
        patch(`api/v1/transactions/${id}`, {
            json: formData,
        })
        .json();

        return transactionResponseSchema.parse(data);
    },
    
    delete: async (id: number): Promise<void> => {
        await api.delete(`api/v1/transactions/${id}`);
    },
};