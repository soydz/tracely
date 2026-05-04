import { Select, Label, ListBox, Modal, Separator, Button } from "@heroui/react"
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

    const { data: categories, isLoading } = useCategory();

    const selectValue = value ? String(value) : null;

    return (
        <>
            <Select
                className="w-[256px]"
                placeholder="Select one"
                value={selectValue}
                onChange={(key) => {
                    onChange(String(key));
                }}
                isDisabled={isLoading}
            >
                <Label>State</Label>
                <Select.Trigger>
                    <Select.Value />
                    <Select.Indicator />
                </Select.Trigger>
                <Select.Popover>
                    <div className="p-2">
                        <Button
                            variant="ghost"
                            className="w-full justify-start gap-2 text-accent font-semibold h-10"
                            onPress={() => setIsOpen(true)}
                        >
                            <Plus size={16} />
                            <span>Create New Category</span>
                        </Button>
                    </div>
                    <Separator />
                    <ListBox>
                        {categories && categories.length > 0 && (
                            categories.map((category) => (
                                <ListBox.Item
                                    key={String(category.id)}
                                    id={String(category.id)}
                                    textValue={category.name}>
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