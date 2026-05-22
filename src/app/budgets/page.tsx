"use client"

import { BudgetForm } from "@/features/budgets/components/BudgetForm";
import { BudgetGrid } from "@/features/budgets/components/BudgetGrid";
import { useBudgets } from "@/features/budgets/hooks/useBudget";
import { BudgetResponse } from "@/features/budgets/schema/budget.schema";
import { MonthYearPicker } from "@/shared/components";
import { Button } from "@heroui/react";
import { useState } from "react";

export default function Budgets() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [initialData, setInitialData] = useState<BudgetResponse | null>(null);

    const [date, setDate] = useState({
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
    });

    const { data: budgets } = useBudgets(date.month, date.year);

    const handleUpdate = (budget: BudgetResponse) => {
        setInitialData(budget);
        setIsOpen(true);
    }

    return (
        <div className="flex flex-col justify-center items-center gap-6 p-4 sm:p-6">

            <div className="relative flex justify-around items-center w-full md:justify-center">
                <MonthYearPicker value={date} onChange={(newDate) => setDate(newDate)} />

                <div className="md:absolute right-0 top-0">
                    <Button variant="primary" onClick={() => {
                        setIsOpen(true);
                        setInitialData(null);
                    }}>
                        Create budget
                    </Button>
                    <BudgetForm
                        isOpen={isOpen}
                        onSuccess={() => {
                            setIsOpen(false);
                            setInitialData(null);
                        }}
                        initialData={initialData} />
                </div>
            </div>

            <BudgetGrid
                budgets={budgets || []}
                handleUpdate={handleUpdate} />
        </div>
    )
}

