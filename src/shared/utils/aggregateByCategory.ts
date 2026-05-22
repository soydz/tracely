import { TransactionResponse } from "@/features/transactions/schemas/transaction.schema";

export function aggregateByCategory(transactions: TransactionResponse[]) {
    if (transactions.length === 0) return [];

    // sumar montos por categorias
    const totalsByCategory = transactions.reduce((acc, t) => {
        const category = t.categoryName;
        acc[category] = (acc[category] || 0) + t.amount;
        return acc;

    }, {} as Record<string, number>);

    // suma todas las categorias
    const total = transactions.reduce((sum, t) => sum + t.amount, 0);

    // array con porcentajes
    return Object.entries(totalsByCategory).map(([category, amount]) => {
        const rawPercentage = total > 0 ? (amount / total) * 100 : 0;

        return {
            category,
            amount,
            percentage: Number(rawPercentage.toFixed(1))
        }
    });
};