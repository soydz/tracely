import { Card } from "@heroui/react";
import { ArrowDownCircle, ArrowUpCircle, DollarSign } from "lucide-react";

import { formatThousands } from "@/shared/utils";

export enum TransactionType {
  income = "INCOME",
  expense = "EXPENSE",
}

interface MonthlyCardDataProps {
  type: TransactionType;
  amount: number;
}

export function MonthlyCardData({
  type,
  amount,
}: Readonly<MonthlyCardDataProps>) {
  return (
    <Card className="px-6 py-2 bg-surface/75 border-border shadow-sm group hover:border-success/50 transition-all">
      <div className="flex flex-col h-full justify-center">
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-muted text-xs uppercase tracking-widest">
              Montly {type}
            </span>
            <div
              className={`p-1.5 rounded-full ${type === TransactionType.income ? "bg-success/10 text-success" : "bg-danger/10 text-danger"}`}
            >
              {type === TransactionType.income ? (
                <ArrowUpCircle size={16} />
              ) : (
                <ArrowDownCircle size={16} />
              )}
            </div>
          </div>

          <div
            className={`flex items-center gap-0.5 text-2xl font-serif tracking-tight ${type === TransactionType.income ? "text-success" : "text-danger"}`}
          >
            <span>{type === TransactionType.income ? "+" : "-"}</span>
            <span>
              <DollarSign size={20} />
            </span>
            <span>{formatThousands(amount)}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
