import { DonutChart } from "@/shared/components";
import { StatsList } from "./StatsList";
import { CHART_COLORS } from "@/shared/constants/colors";

interface Stat {
    amount: number;
    category: string;
    percentage: number;
}

interface StatsGraphProps {
    transactions: Stat[];
    title: string;
}

export function StatsGraph({transactions, title} : Readonly<StatsGraphProps>) {
    return (
        <div className="grid grid-cols-1 w-full">
            <h3 className={`text-center text-2xl font-medium mx-32 border-b ${title.toLocaleLowerCase() === "income" ? "border-green-500" : "border-red-500"}`}>{title}</h3>
            {transactions.length > 0 ? (
                <DonutChart
                    data={transactions}
                    dataKey="percentage"
                    nameKey="category"
                />
            ) : (
                <p className="mt-10 text-center text-muted">No expenses in this date range</p>
            )}

            <div className="flex justify-center">
                <StatsList
                    stats={transactions}
                    type="INCOME"
                    colors={CHART_COLORS}
                />
            </div>
        </div>
    )
}