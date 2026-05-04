import { MonthYearDates } from "@/shared/components";

import { TransactionResponse } from "../schemas/transaction.schema";

import { TransactionCard } from "./TransactionCard";

interface TransactionGridProps {
  transactions: TransactionResponse[];
  filter: MonthYearDates;
}

export function TransactionGrid({
  transactions,
  filter,
}: Readonly<TransactionGridProps>) {
  const filteredTransactions = transactions.filter((tx) => {
    const date = new Date(tx.transactionDate);
    return (
      date.getMonth() + 1 === filter.month && date.getFullYear() === filter.year
    );
  });

  if (filteredTransactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-10 border-2 border-dashed border-border rounded-3xl bg-surface max-w-96">
        <div className="w-12 h-12 bg-default rounded-full flex items-center justify-center mb-4 text-muted">
          ∅
        </div>
        <h3 className="text-xl font-serif text-foreground mb-2">
          No transactions this month
        </h3>
        <p className="text-muted text-sm max-w-xs">
          {" "}
          Your financial gallery is empty for {filter.month}/{filter.year}.
          Start adding your movements
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3 w-full">
      {filteredTransactions.map((tx) => (
        <TransactionCard key={tx.id} transaction={tx} />
      ))}
    </div>
  );
}
