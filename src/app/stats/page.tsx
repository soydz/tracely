"use client"

import { StatsList } from "@/features/stats/components/StatsList";
import { useTransaction } from "@/features/transactions/hooks/useTransactions";
import { AppDatePicker, DonutChart } from "@/shared/components";
import { CHART_COLORS } from "@/shared/constants/colors";
import { aggregateByCategory } from "@/shared/utils";
import { useMemo, useState } from "react";

export default function Stats() {
    const [startDate, setStartDate] = useState<string>(() => {
        const now = new Date();
        now.setDate(1);
        return now.toISOString().split('T')[0];
    });
    const [endDate, setEndDate] = useState<string>(() => {
        const now = new Date();
        const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        return lastDay.toISOString().split('T')[0];
    });

    const { data: transactions } = useTransaction();

    const filterData = useMemo(() => {
        if (!transactions) return [];
        if (!startDate || !endDate) return transactions;

        return transactions.filter((t) => {
            const tDate = new Date(t.transactionDate).getTime();
            let startTimestamp = -Infinity;
            if (startDate) {
                startTimestamp = new Date(startDate + 'T00:00:00.000').getTime();
            }
            let endTimestamp = Infinity;
            if (endDate) {
                endTimestamp = new Date(endDate + 'T23:59:59.999').getTime();
            }
            return tDate >= startTimestamp && tDate <= endTimestamp;
        });

    }, [startDate, endDate, transactions]);

    const categoryStats = useMemo(() => {
        if (!filterData || filterData.length === 0) return {
            incomeTransactions: [],
            expenseTransactions: [],
        };

        const incomeTransactions = filterData.filter(t => t.type === "INCOME");
        const expenseTransactions = filterData.filter(t => t.type === "EXPENSE");

        return {
            incomeTransactions: aggregateByCategory(incomeTransactions),
            expenseTransactions: aggregateByCategory(expenseTransactions),
        }

    }, [filterData])

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <AppDatePicker
                    label="Start"
                    value={startDate}
                    onChange={(date) => setStartDate(date)}
                />
                <AppDatePicker
                    label="End"
                    value={endDate}
                    onChange={(date) => setEndDate(date)}
                />
            </div>

            <div className="w-full grid grid-cols-1 items-start lg:grid-cols-2">
                <div className="grid grid-cols-1 w-full">
                    {categoryStats?.incomeTransactions.length > 0 ? (
                        <DonutChart
                            data={categoryStats.incomeTransactions}
                            dataKey="percentage"
                            nameKey="category"
                        />
                    ) : (
                        <p className="mt-10 text-center text-muted">No expenses in this date range</p>
                    )}

                    <div className="flex justify-center">
                        <StatsList
                            stats={categoryStats?.incomeTransactions}
                            type="EXPENSE"
                            colors={CHART_COLORS}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 w-full">
                    {categoryStats?.expenseTransactions.length > 0 ? (
                        <DonutChart
                            data={categoryStats.expenseTransactions}
                            dataKey="percentage"
                            nameKey="category"
                        />
                    ) : (
                        <p className="mt-10 text-center text-muted">No expenses in this date range</p>
                    )}

                    <div className="flex justify-center">
                        <StatsList
                            stats={categoryStats?.expenseTransactions}
                            type="EXPENSE"
                            colors={CHART_COLORS}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}