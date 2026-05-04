import { Card, Skeleton, toast } from "@heroui/react";
import {
  DollarSign,
  TrendingDown,
  TrendingUp,
  TrendingUpDown,
} from "lucide-react";
import { useEffect } from "react";

import { MonthYearDates, MonthYearPicker } from "@/shared/components";
import { formatThousands } from "@/shared/utils";

import { useBalance, useTotalBalance } from "../hooks/useTransactions";

import { MonthlyCardData, TransactionType } from "./MonthlyCardData";

interface BalanceOverviewProps {
  date: MonthYearDates;
  setDate: (date: MonthYearDates) => void;
}

export function BalanceOverview({
  date,
  setDate,
}: Readonly<BalanceOverviewProps>) {
  const { data, isError, isLoading } = useBalance(date.month, date.year);
  const { totalBalance } = useTotalBalance();

  const STATUS_CONFIG = {
    SUPERAVIT: {
      label: "Positive Growth",
      color: "text-success",
      bg: "bg-success/10",
      icon: <TrendingUp size={16} />,
    },
    EQUILIBRIO: {
      label: "Stable Balance",
      color: "text-accent",
      bg: "bg-accent/10",
      icon: <TrendingUpDown size={16} />,
    },
    DEFICIT: {
      label: "Attention Required",
      color: "text-danger",
      bg: "bg-danger/10",
      icon: <TrendingDown size={16} />,
    },
  } as const;

  const getStatusKey = (balance: number | undefined) => {
    if (balance === undefined) return "EQUILIBRIO";
    if (balance > 0) return "SUPERAVIT";
    if (balance < 0) return "DEFICIT";
    return "EQUILIBRIO";
  };

  const config = STATUS_CONFIG[getStatusKey(totalBalance)];

  const getBalanceColor = (balance: number) => {
    if (balance > 0) return "text-accent";
    if (balance < 0) return "text-danger/90";
    return "text-foreground";
  };

  useEffect(() => {
    if (isError) {
      toast.danger("Error loading financial balance. Please refresh the page");
    }
  }, [isError]);

  if (isLoading) {
    return (
      <div className="skeleton--shimmer w-full max-w-full grid grid-cols-1 md:grid-cols-2 gap-4 rounded-xl overflow-hidden">
        <Skeleton className="w-full h-full rounded-xl" />
        <div className="flex flex-col gap-4">
          <Skeleton className="w-full h-24 rounded-xl" />
          <Skeleton className="w-full h-24 rounded-xl" />
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex flex-col gap-1 justify-center">
        <p className="text-center text-danger">
          Error loading financial balance
        </p>
        <p className="text-center text-danger">
          The server is currently frozen or waking up. Please try again in a few
          moments.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-center">
        <MonthYearPicker
          value={date}
          onChange={(newDate) => setDate(newDate)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="px-6 bg-surface/75 border-border shadow-sm group hover:border-accent">
          <div className="flex flex-col h-full justify-between">
            <span className="text-muted text-xs uppercase tracking-tighter mb-2">
              Total Balance
            </span>
            <div>
              <div
                className={`flex items-center text-5xl font-serif tracking-tighter ${getBalanceColor(totalBalance)}`}
              >
                <span className="block items-center h-full">
                  <DollarSign size={42} />
                </span>
                <span className="text-6xl font-serif">
                  {formatThousands(totalBalance)}
                </span>
              </div>
              <div className="flex items-center gap-2 text-success text-sm font-medium">
                <div className="flex items-center gap-2 mt-4">
                  <div
                    className={`p-1 rounded-full ${config.bg} ${config.color} transition-colors`}
                  >
                    {config.icon}
                  </div>
                  <span className={`text-sm font-medium ${config.color}`}>
                    Financial health:{" "}
                    <span className="font-bold">{config.label}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div className="flex flex-col gap-3">
          <MonthlyCardData
            type={TransactionType.income}
            amount={data.totalIncome}
          />
          <MonthlyCardData
            type={TransactionType.expense}
            amount={data.totalExpense}
          />
        </div>
      </div>
    </div>
  );
}
