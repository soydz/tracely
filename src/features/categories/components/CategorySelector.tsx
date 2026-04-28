import { Select, Label, ListBox, Modal, Separator } from "@heroui/react"
import { CategoryForm } from "./CategoryForm";
import { useState } from "react";
import { Plus } from "lucide-react";
import { useCategory } from "../hooks/useCategory";

interface CategorySelectorProps {
    value: string | number;
    onChange: (value: string) => void;
}

export function CategorySelector({ value, onChange }: Readonly<CategorySelectorProps>) {

    const [isOpen, setIsOpen] = useState(false);

    const {data:categories, isLoading} = useCategory();

    return (
        <>
            <Select
                className="w-[256px]"
                placeholder="Select one"
                value={value}
                onChange={(key) => {
                    if (key === "create-new-category") return;
                    onChange(String(key))
                }}
                isDisabled={isLoading}
            >
                <Label>State</Label>
                <Select.Trigger>
                    <Select.Value />
                    <Select.Indicator />
                </Select.Trigger>
                <Select.Popover>
                    <ListBox>
                        <ListBox.Item
                            key="create-new-category"
                            id="create-new-category"
                            onClick={() => setIsOpen(true)}
                            className="text-accent font-semibold"
                        >
                            <Plus />
                            Create New Category
                        </ListBox.Item>

                        <Separator />

                        {categories && categories.length > 0 && (
                            categories.map((category) => (
                                <ListBox.Item key={String(category.id)} id={category.id} textValue={category.name}>
                                    {category.name}
                                    <ListBox.ItemIndicator />
                                </ListBox.Item>
                            ))
                        )}

                    </ListBox>
                </Select.Popover>
            </Select>


            <Modal
                isOpen={isOpen}
                onOpenChange={setIsOpen}
            >
                <Modal.Backdrop>
                    <Modal.Container size="lg">
                        <Modal.Dialog>
                            <Modal.CloseTrigger />
                            <Modal.Header>
                                <Modal.Heading>Add Category</Modal.Heading>
                            </Modal.Header>
                            <Modal.Body>
                                <CategoryForm
                                    onSuccess={(id) => {
                                        onChange(String(id));
                                        setIsOpen(false);
                                    }}
                                    onClose={() => setIsOpen(false)}
                                />
                            </Modal.Body>
                        </Modal.Dialog>
                    </Modal.Container>
                </Modal.Backdrop>
            </Modal>
        </>

    )
}