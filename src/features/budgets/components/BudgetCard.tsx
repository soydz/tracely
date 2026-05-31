import { ChartCircularProgress } from "@/shared/components";
import { formatThousands } from "@/shared/utils";
import { Button, Card } from "@heroui/react";
import { Pencil } from "lucide-react";
import { BudgetResponse } from "../schema/budget.schema";

interface BudgetCardProps {
    budget: BudgetResponse;
    handleUpdate: (budget: BudgetResponse) => void;
}

export function BudgetCard({ budget, handleUpdate }: Readonly<BudgetCardProps>) {
    const calculatedPercentage = (budget.spent * 100) / budget.limitAmount;

    return (
        <Card className="group relative p-6 bg-surface/60 hover:border-accent transition-all duration-300">
            <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-all z-10">
                <Button variant="ghost" isIconOnly className="hover:cursor-pointer text-foreground" onClick={() => handleUpdate(budget)}>
                    <Pencil className="size-5"/>
                </Button>
            </div>
            <div className="flex flex-col items-center gap-4">
                <ChartCircularProgress
                    percentage={calculatedPercentage}
                    label={budget.categoryName}
                />
                <div className="">
                    <p className="flex gap-3 text-xl font-serif text-foreground">
                        <span className="">{formatThousands(budget.spent)}</span>
                        <span className="text-muted">/</span>
                        <span>{formatThousands(budget.limitAmount)}</span>
                    </p>
                </div>
            </div>
        </Card>
    )
}