import {
  Button,
  Label,
  Input,
  Tabs,
  DatePicker,
  DateField,
  Calendar,
  Separator,
  Spinner,
} from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { getLocalTimeZone, parseDate, today } from "@internationalized/date";
import { DollarSign } from "lucide-react";
import { useForm, Controller, Resolver } from "react-hook-form";

import { CategorySelector } from "@/features/categories/components/CategorySelector";
import {
  formatThousands,
  formatCalendarDateToUTCISO,
  isValidFormat,
} from "@/shared/utils";

import { useCreateTransaction } from "../hooks/useTransactions";
import {
  TransactionData,
  TransactionResponse,
  transactionSchema,
} from "../schemas/transaction.schema";

interface TransactonFormProps {
  onSuccess?: () => void;
  initialData?: TransactionResponse;
}

export function TransactionForm({ onSuccess }: Readonly<TransactonFormProps>) {
  const { mutate: createTransaction, isPending } = useCreateTransaction();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TransactionData>({
    // Cast necesario: la UI envía la categoría como string, pero el backend requiere un number. Zod realiza la coerción automáticamente
    resolver: zodResolver(transactionSchema) as Resolver<TransactionData>,
    defaultValues: {
      type: "EXPENSE" as const,
      transactionDate: new Date().toISOString().replace("Z", "").split(".")[0],
      categoryId: 0,
      description: "",
      notes: "",
      amount: 0,
    },
  });

  const onSubmit = (data: TransactionData) => {
    createTransaction(data, {
      onSuccess: () => onSuccess?.(),
    });
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 p-1"
      >
        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <Tabs
              {...field}
              className="w-full"
              selectedKey={field.value}
              onSelectionChange={(key) => field.onChange(key)}
            >
              <Tabs.ListContainer>
                <Tabs.List
                  aria-label="Transaction Type"
                  className="*:data-[selected=true]:text-danger-foreground"
                >
                  <Tabs.Tab id="EXPENSE">
                    Expense
                    <Tabs.Indicator className="bg-danger text-danger-foreground" />
                  </Tabs.Tab>
                  <Tabs.Tab id="INCOME">
                    Income
                    <Tabs.Indicator className="bg-success text-success-foreground" />
                  </Tabs.Tab>
                </Tabs.List>
              </Tabs.ListContainer>
            </Tabs>
          )}
        />

        <Controller
          name="amount"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col items-center gap-1">
              <Label htmlFor="description">Amount</Label>
              <div className="flex items-center">
                <DollarSign
                  size="40"
                  color="gray"
                  className="bg-transparent text-muted"
                />
                <Input
                  className="text-center bg-transparent text-5xl w-72 rounded-2xl p-0"
                  id="description"
                  placeholder="5.000"
                  type="text"
                  variant="secondary"
                  value={field.value === 0 ? "" : formatThousands(field.value)}
                  onChange={(key) => {
                    // elimina todos los puntos
                    const rawValue = key.target.value.replaceAll(".", "");
                    // pasa de string a numero
                    field.onChange(Number.parseInt(rawValue) || 0);
                  }}
                />
              </div>

              {errors.amount && (
                <span className="text-danger text-tiny">
                  {errors.amount.message}
                </span>
              )}
            </div>
          )}
        />

        <div className="w-full flex justify-between items-center">
          <Controller
            name="transactionDate"
            control={control}
            render={({ field }) => (
              <DatePicker
                className="w-64"
                name="transactionDate"
                value={
                  isValidFormat(field.value)
                    ? parseDate(field.value.toString().split("T")[0])
                    : undefined
                }
                onChange={(key) =>
                  key && field.onChange(formatCalendarDateToUTCISO(key))
                }
                isInvalid={!!errors.transactionDate}
              >
                <Label>Date</Label>
                <DateField.Group fullWidth>
                  <DateField.Input>
                    {(segment) => <DateField.Segment segment={segment} />}
                  </DateField.Input>
                  <DateField.Suffix>
                    <DatePicker.Trigger>
                      <DatePicker.TriggerIndicator />
                    </DatePicker.Trigger>
                  </DateField.Suffix>
                </DateField.Group>
                <DatePicker.Popover>
                  <Calendar
                    aria-label="Event date"
                    maxValue={today(getLocalTimeZone())}
                  >
                    <Calendar.Header>
                      <Calendar.YearPickerTrigger>
                        <Calendar.YearPickerTriggerHeading />
                        <Calendar.YearPickerTriggerIndicator />
                      </Calendar.YearPickerTrigger>
                      <Calendar.NavButton slot="previous" />
                      <Calendar.NavButton slot="next" />
                    </Calendar.Header>
                    <Calendar.Grid>
                      <Calendar.GridHeader>
                        {(day) => (
                          <Calendar.HeaderCell>{day}</Calendar.HeaderCell>
                        )}
                      </Calendar.GridHeader>
                      <Calendar.GridBody>
                        {(date) => <Calendar.Cell date={date} />}
                      </Calendar.GridBody>
                    </Calendar.Grid>
                    <Calendar.YearPickerGrid>
                      <Calendar.YearPickerGridBody>
                        {({ year }) => <Calendar.YearPickerCell year={year} />}
                      </Calendar.YearPickerGridBody>
                    </Calendar.YearPickerGrid>
                  </Calendar>
                </DatePicker.Popover>
                {errors.transactionDate && (
                  <span className="text-danger text-tiny">
                    {errors.transactionDate.message}
                  </span>
                )}
              </DatePicker>
            )}
          />

          <Controller
            name="categoryId"
            control={control}
            render={({ field }) => (
              <CategorySelector
                value={field.value}
                onChange={(key) => field.onChange(key)}
              />
            )}
          />
        </div>

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <div className="w-full">
              <Label htmlFor="description">Description</Label>
              <Input
                className="w-full"
                id="description"
                placeholder="What was this for?"
                type="text"
                value={field.value}
                onChange={(key) => field.onChange(key.target.value)}
              />
              {errors.description && (
                <span className="text-danger text-tiny">
                  {errors.description.message}
                </span>
              )}
            </div>
          )}
        />
        <Separator />
        <Controller
          name="notes"
          control={control}
          render={({ field }) => (
            <div className="w-full ">
              <Label htmlFor="notes" className="text-tiny opacity-50">
                Note
              </Label>
              <Input
                className="w-full"
                id="notes"
                placeholder="Additional details (optional)"
                type="text"
                value={field.value}
                onChange={(key) => field.onChange(key.target.value)}
              />

              {errors.notes && (
                <span className="text-danger text-tiny">
                  {errors.notes.message}
                </span>
              )}
            </div>
          )}
        />

        <Button type="submit" className="w-full" isPending={isPending}>
          {isPending ? (
            <Spinner color="current"/>
          ) : (
            "Save"
          )}
        </Button>
      </form>
    </div>
  );
}
