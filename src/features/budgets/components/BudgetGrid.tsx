import { BudgetResponse } from "../schema/budget.schema";
import { BudgetCard } from "./BudgetCard";

interface BudgetGridProps {
    budgets: BudgetResponse[];
    handleUpdate: (budget: BudgetResponse) => void;

}

export function BudgetGrid({ budgets, handleUpdate }: Readonly<BudgetGridProps>) {

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 md:gap-6 lg:grid-cols-4 xl:grid-cols-5">
            {budgets.map((b) => (
                <BudgetCard
                    key={b.id}
                    budget={b}
                    handleUpdate={handleUpdate}
                />
            ))}
        </div>
    )
}
