import { Button, Card, Spinner } from "@heroui/react";
import { DollarSign, Pencil, Trash2 } from "lucide-react";

import { ConfirmDeleteAlert } from "@/shared/components";
import { formatThousands } from "@/shared/utils";

import { useDeleteTransaction } from "../hooks/useTransactions";
import { TransactionResponse } from "../schemas/transaction.schema";

import { TransactionType } from "./MonthlyCardData";

interface TransactionCardProps {
  transaction: TransactionResponse;
}

export function TransactionCard({
  transaction,
}: Readonly<TransactionCardProps>) {
  const { mutate: deleteTransaction, isPending } = useDeleteTransaction();

  const handleDelete = async () => {
    deleteTransaction(transaction.id);
  };

  const isIncome = transaction.type === TransactionType.income;

  const dateObj = new Date(transaction.transactionDate);
  const formattedDate = dateObj.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return (
    <Card
      tabIndex={0}
      className="group relative overflow-hidden bg-surface/60 backdrop-blur-sm border border-border hover:border-accent/50 focus:border-accent/50 transition-all duration-300 shadow-sm"
    >
      <div
        className={`absolute w-px left-0 top-0 bottom-0 ${isIncome ? "bg-success/90" : "bg-danger/90"}`}
      ></div>

      <div className="absolute top-2 right-2 flex gap-4 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-all duration-200">
        <Button
          variant="ghost"
          className="hidden p-4 text-accent/70 hover:text-accent"
          onClick={() => alert("update")}
        >
          <Pencil size={22} />
        </Button>

        <ConfirmDeleteAlert
          title="Delete Transaction?"
          description={`Are you sure you want to delete "${transaction.description}"? This action cannot be undone.`}
          onConfirm={() => handleDelete()}
          trigger={
            <Button
              variant="ghost"
              className="p-4 text-danger/70 hover:text-danger"
              aria-label="Delete transaction"
            >
              {isPending ? <Spinner color="danger" /> : <Trash2 size={22} />}
            </Button>
          }
        />
      </div>

      <div className="flex justify-between mt-2 pt-2">
        <div className="flex gap-4 px-1 py-2">
          <div className="flex flex-col items-center justify-center min-w-14 border-r border-border/50 pr-4">
            <span className="text-xs uppercase tracking-widest text-muted font-medium mt-1">
              {formattedDate}
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center">
              <span className="text-xs text-accent tracking-widest opacity-80">
                {transaction.categoryName}
              </span>
            </div>

            <h4 className="text-base font-serif text-foreground leading-tight line-clamp-2 group-hover:line-clamp-none group-hover:text-accent group-focus-within:line-clamp-none group-focus-within:text-accent transition-colors">
              {transaction.description}
            </h4>

            {transaction.notes && (
              <p className="text-sm text-muted line-clamp-2 opacity-75 group-hover:line-clamp-none group-hover:opacity-100 group-focus-within:line-clamp-none transition-all duration-300 ease-in-out">
                {transaction.notes}
              </p>
            )}
          </div>
        </div>

        <div
          className={`flex items-center text-xl font-serif font-bold ${isIncome ? "text-success/85" : "text-danger/85"}`}
        >
          <span className="flex items-center">
            {isIncome ? "+" : "-"} <DollarSign size={22} />{" "}
          </span>
          <span className="mt-0.5">{formatThousands(transaction.amount)}</span>
        </div>
      </div>
    </Card>
  );
}
