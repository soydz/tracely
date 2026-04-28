import { Button, TextField, Label, Input } from "@heroui/react"
import { useCreateCategory } from "../hooks/useCategory"
import { Controller, useForm } from "react-hook-form";
import { CategoryData, categorySchema } from "../schema/category.schema";
import { zodResolver } from "@hookform/resolvers/zod";

interface CategoryFormProps {
    onSuccess?: (id: string) => void;
    onClose?: () => void;
}

export function CategoryForm({ onSuccess, onClose }: Readonly<CategoryFormProps>) {
    const { mutate: createCategory, isPending } = useCreateCategory();

    const { handleSubmit, control, reset, formState: { errors } } = useForm<CategoryData>({
        resolver: zodResolver(categorySchema),
        defaultValues: {
            name: ""
        }
    });

    const onSubmit = (data: CategoryData) => {
        // Enviamos el ID al padre (CategorySelector)
        onSuccess?.(data.name);

        
        createCategory(data, {
            onSuccess: (response) => {
                onSuccess?.(String(response.id));
                reset();
            },
        });
        
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 p-1">
            <Controller
                name="name"
                control={control}
                render={({ field }) => (
                    <>
                        <TextField className="w-full" name="name" type="text">
                            <Label>Category name</Label>
                            <Input
                                {...field}
                                placeholder="Enter your category"
                                autoFocus
                            />
                        </TextField>
                        {errors.name && (
                            <span className="text-danger text-tiny">
                                {errors.name.message}
                            </span>
                        )}
                    </>
                )}
            />
            <div className="flex flex-row gap-4">
                <Button variant="danger" onPress={onClose} className="w-full">Cancel</Button>
                <Button type="submit"
                    className="w-full"
                    isPending={isPending}
                >
                    Create
                </Button>
            </div>

        </form>
    )
}
