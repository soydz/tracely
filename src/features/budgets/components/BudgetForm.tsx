import { CategorySelector } from "@/features/categories/components/CategorySelector";
import { Button, Input, Label, Modal, Spinner, Surface, TextField } from "@heroui/react";
import { Controller, Resolver, useForm } from "react-hook-form";
import { BudgetData, BudgetResponse, budgetSchema } from "../schema/budget.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateBudget, useUpdateBudget } from "../hooks/useBudget";
import { formatThousands } from "@/shared/utils";
import { useCategory } from "@/features/categories/hooks/useCategory";
import { useEffect, useMemo } from "react";

interface BudgetFormProps {
    isOpen: boolean;
    onSuccess: () => void;
    initialData: BudgetResponse | null;
}

export function BudgetForm({ isOpen, onSuccess, initialData }: Readonly<BudgetFormProps>) {
    const { mutate: createBudget, isPending: isPendingCreate } = useCreateBudget();
    const { mutate: updateBudget, isPending: isPendingUpdate } = useUpdateBudget();
    const { data: categories } = useCategory();

    const initialCategoryId = useMemo(() => {
        if (!initialData?.categoryName) return 0;

        const found = categories?.find(cat => cat.name === initialData.categoryName);
        return found ? found.id : 0;

    }, [initialData, categories]);

    const { handleSubmit, control, reset, formState: { errors } } = useForm<BudgetData>({
        resolver: zodResolver(budgetSchema) as Resolver<BudgetData>,
        defaultValues: {
            categoryId: initialData ? initialCategoryId : 0,
            limitAmount: initialData ? initialData.limitAmount : 0,
        },
    });

    useEffect(() => {
        if (!isOpen) {
            reset({
                categoryId: 0,
                limitAmount: 0,
            });
            return;
        }

        if (initialData && initialCategoryId) {
            reset({
                categoryId: initialCategoryId,
                limitAmount: initialData.limitAmount,
            })
        } else {
            reset({
                categoryId: 0,
                limitAmount: 0,
            });
        }
    }, [isOpen, initialData, initialCategoryId, reset])


    const onSubmit = (data: BudgetData) => {
        if (initialData) {

            const payload = {
                categoryId: data.categoryId,
                limitAmount: data.limitAmount,
                month: initialData.month,
                year: initialData.year,
            }

            updateBudget({ budgetId: initialData.id, data: payload }, {
                onSuccess: () => onSuccess?.(),
            });

        } else {
            const now = new Date();

            const payload = {
                ...data,
                month: now.getMonth() + 1,
                year: now.getFullYear(),
            }

            createBudget(payload, {
                onSuccess: () => onSuccess?.(),
            })
        }
        reset();
    }

    return (
        <Modal isOpen={isOpen} onOpenChange={onSuccess}>
            <Modal.Backdrop>
                <Modal.Container placement="auto">
                    <Modal.Dialog className="sm:max-w-md">
                        <Modal.CloseTrigger />
                        <Modal.Header>
                            <Modal.Heading>
                                {initialData ? "Update budget" : "Create budget"}
                            </Modal.Heading>
                        </Modal.Header>
                        <Modal.Body className="p-2 py-2">
                            <Surface variant="default">
                                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                                    <TextField name="category" type="text" className="w-full">
                                        <Controller
                                            name="categoryId"
                                            control={control}
                                            render={({ field }) => (
                                                <>
                                                    {initialData ? (
                                                        <CategorySelector
                                                            value={field.value}
                                                            onChange={(key) => field.onChange(key)}
                                                            isDisable
                                                        />

                                                    ) : (
                                                        <CategorySelector
                                                            value={field.value}
                                                            onChange={(key) => field.onChange(key)}

                                                        />
                                                    )}

                                                    {errors && (
                                                        <span className="text-danger text-tiny">
                                                            {errors.categoryId?.message}
                                                        </span>
                                                    )}
                                                </>
                                            )}
                                        />
                                    </TextField>
                                    <TextField name="limitAmount" type="number" className="w-full">
                                        <Controller
                                            name="limitAmount"
                                            control={control}
                                            render={({ field }) => (
                                                <>
                                                    <Label>Limit amount</Label>
                                                    <Input
                                                        value={field.value === 0 ? "" : formatThousands(field.value)}
                                                        onChange={(key) => {
                                                            // elimnina los puntos
                                                            const rawValue = key.target.value.replaceAll(".", "");
                                                            // pasa de string a numero
                                                            field.onChange(Number.parseInt(rawValue) || 0);
                                                        }}
                                                        type="text"

                                                        placeholder="150.000" />
                                                    {errors && (
                                                        <span className="text-danger text-tiny">
                                                            {errors.limitAmount?.message}
                                                        </span>
                                                    )}
                                                </>
                                            )}
                                        />
                                    </TextField>

                                    <div className="flex justify-end gap-2 mt-4">
                                        <Button slot="close" variant="danger">Cancel</Button>
                                        <Button
                                            type="submit"
                                            isPending={initialData ? isPendingUpdate : isPendingCreate}
                                        >
                                            {isPendingCreate || isPendingUpdate ? (
                                                <Spinner color="current" />
                                            ) : (
                                                initialData ? "Update" : "Create"
                                            )}
                                        </Button>
                                    </div>
                                </form>
                            </Surface>
                        </Modal.Body>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    )
}
