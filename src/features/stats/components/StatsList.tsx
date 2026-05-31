import { CHART_COLORS } from "@/shared/constants/colors";
import { formatThousands } from "@/shared/utils";
import { Chip } from "@heroui/react";

interface Stat {
    amount: number;
    category: string;
    percentage: number;
}

interface StatsGridProps {
    stats: Stat[];
    type: "INCOME" | "EXPENSE";
    colors?: string[];
}

export function StatsList({ stats, type, colors = CHART_COLORS }: Readonly<StatsGridProps>) {
    return (
        <div className="flex flex-col gap-3 max-w-80 w-full">
            {stats?.map((t, index) => (
                <div key={t.category} className="flex gap-4 justify-between">
                    <div className="flex items-center gap-2">
                        <span
                            className="inline-block w-3 h-3 rounded-full shrink-0"
                            style={{ backgroundColor: colors[index % colors.length] }}
                        />
                        <span className="text-sm">{t.category}</span>
                    </div>

                    <div className="flex gap-2">
                        <span className="text-sm font-mono">$ {formatThousands(t.amount)}</span>
                        <Chip color={type === "INCOME" ? "success" : "danger"} className="w-14 text-tiny">{t.percentage} %</Chip>
                    </div>
                </div>
            ))}
        </div>
    )
}