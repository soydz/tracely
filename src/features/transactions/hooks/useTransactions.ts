import { toast } from "@heroui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { HTTPError } from "ky";
import { useMemo } from "react";

import { transactionService } from "../api/transaction.service";
import { TransactionType } from "../components/MonthlyCardData";
import { TransactionData } from "../schemas/transaction.schema";

export function useTransaction() {
  return useQuery({
    queryKey: ["transactions"],
    queryFn: () => transactionService.getAll(),
  });
}

export function useCreateTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: TransactionData) => {
      return transactionService.create(data);
    },
    onSuccess: () => {
      // actualización forzosa de la lista
      queryClient.invalidateQueries({ queryKey: ["transactions"] });

      // actualiza presupuestos
      queryClient.invalidateQueries({ queryKey: ["budgets"]});

      toast.success("Transaction registered successfully");
    },
    onError: (error: unknown) => {
      if (error instanceof HTTPError) {
        toast.danger(error.data?.error || "Failed to create transaction");
      } else {
        toast.danger("An unexpected error occurred");
      }
    },
  });
}

export function useUpdateTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: TransactionData }) => {
      return transactionService.update(id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      toast.success("Transaction updated successfully");
    },
    onError: (error: unknown) => {
      if (error instanceof HTTPError) {
        toast.danger(error.data?.error || "Failed to update transaction");
      } else {
        toast.danger("An unexpected error occurred");
      }
    },
  });
}

export function useDeleteTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      return transactionService.delete(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      toast.success("Transaction deleted");
    },
    onError: () => {
      toast.danger("Could not delete the transaction");
    },
  });
}

export function useBalance(month?: number, year?: number) {
  const now = new Date();
  const currentMonth = month || now.getMonth() + 1;
  const currentYear = year || now.getFullYear();

  return useQuery({
    queryKey: ["transactions", "balance", currentMonth, currentYear],
    queryFn: () =>
      transactionService.getMonthlyBalance(currentMonth, currentYear),
  });
}

export function useTotalBalance() {
  const { data: transactions = [], ...rest } = useTransaction();

  const totalBalance = useMemo(() => {
    return transactions?.reduce((acc, transaction) => {
      return transaction.type === TransactionType.income
        ? acc + transaction.amount
        : acc - transaction.amount;
    }, 0);
  }, [transactions]);
  return { totalBalance, ...rest };
}
