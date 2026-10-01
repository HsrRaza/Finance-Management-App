import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Modal } from "../../../components/ui/Modal";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import { useIncomes } from "../../income/hooks/useIncomes";
import { useExpenses } from "../../expenses/hooks/useExpenses";
import { EXPENSE_CATEGORIES, INCOME_SOURCES } from "../../../lib/constants";
import { DollarSign, Tag, Calendar as CalendarIcon } from "lucide-react";

const addTransactionSchema = z.object({
  type: z.enum(["income", "expense"]),
  titleOrSource: z.string().min(1, "Title or source is required"),
  category: z.string().min(1, "Category is required"),
  amount: z.number({ invalid_type_error: "Amount must be a number" }).positive("Amount must be greater than 0"),
  date: z.string().min(1, "Date is required"),
});

type TransactionFormValues = z.infer<typeof addTransactionSchema>;

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultType?: "income" | "expense";
}

export const AddTransactionModal: React.FC<AddTransactionModalProps> = ({
  isOpen,
  onClose,
  defaultType = "expense",
}) => {
  const [transactionType, setTransactionType] = useState<"income" | "expense">(defaultType);
  const { addIncome, isAdding: isAddingIncome } = useIncomes();
  const { addExpense, isAdding: isAddingExpense } = useExpenses();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<TransactionFormValues>({
    resolver: zodResolver(addTransactionSchema),
    defaultValues: {
      type: defaultType,
      titleOrSource: "",
      category: defaultType === "expense" ? EXPENSE_CATEGORIES[0] : INCOME_SOURCES[0],
      amount: 0,
      date: new Date().toISOString().split("T")[0],
    },
  });

  const handleTypeChange = (type: "income" | "expense") => {
    setTransactionType(type);
    setValue("type", type);
    setValue("category", type === "expense" ? EXPENSE_CATEGORIES[0] : INCOME_SOURCES[0]);
  };

  const onSubmit = async (data: TransactionFormValues) => {
    try {
      if (data.type === "income") {
        await addIncome({
          source: data.titleOrSource,
          amount: data.amount,
          date: data.date,
          category: data.category,
        });
        toast.success("Income entry logged!");
      } else {
        await addExpense({
          category: data.category,
          amount: data.amount,
          title: data.titleOrSource,
          date: data.date,
        });
        toast.success("Expense entry logged!");
      }
      reset();
      onClose();
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Failed to record transaction";
      toast.error(errorMessage);
    }
  };

  const categories = transactionType === "expense" ? EXPENSE_CATEGORIES : INCOME_SOURCES;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Record Transaction"
      description="Add a new entry to your financial cash flow log."
    >
      <div className="flex rounded-lg bg-[#EFEEE8] dark:bg-[#2A333D] p-1 mb-5 border border-[#E2E0D8] dark:border-[#2E3742]">
        <button
          type="button"
          onClick={() => handleTypeChange("expense")}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-colors ${
            transactionType === "expense"
              ? "bg-[#B94A4A] text-white shadow-2xs"
              : "text-[#66717C] dark:text-[#9CA3AF] hover:text-[#17212B] dark:hover:text-[#F3F4F6]"
          }`}
        >
          Expense
        </button>
        <button
          type="button"
          onClick={() => handleTypeChange("income")}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-colors ${
            transactionType === "income"
              ? "bg-[#1F5C4A] text-white shadow-2xs"
              : "text-[#66717C] dark:text-[#9CA3AF] hover:text-[#17212B] dark:hover:text-[#F3F4F6]"
          }`}
        >
          Income
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label={transactionType === "income" ? "Income Source" : "Description / Title"}
          placeholder={transactionType === "income" ? "e.g. Primary Salary, Client Retainer" : "e.g. Office Supplies, Groceries"}
          icon={<Tag className="h-4 w-4" />}
          error={errors.titleOrSource?.message}
          {...register("titleOrSource")}
        />

        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-[#17212B] dark:text-[#F3F4F6]">
            Category
          </label>
          <select
            className="flex h-10 w-full rounded-lg border border-[#E2E0D8] dark:border-[#2E3742] bg-white dark:bg-[#1F262E] px-3 py-2 text-sm text-[#17212B] dark:text-[#F3F4F6] focus:outline-none focus:ring-1 focus:ring-[#1F5C4A]"
            {...register("category")}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-xs text-[#B94A4A] font-medium">{errors.category.message}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Amount ($)"
            type="number"
            step="0.01"
            placeholder="0.00"
            icon={<DollarSign className="h-4 w-4" />}
            error={errors.amount?.message}
            {...register("amount", { valueAsNumber: true })}
          />

          <Input
            label="Date"
            type="date"
            icon={<CalendarIcon className="h-4 w-4" />}
            error={errors.date?.message}
            {...register("date")}
          />
        </div>

        <div className="flex justify-end gap-2 pt-3 border-t border-[#E2E0D8] dark:border-[#2E3742]">
          <Button variant="secondary" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button
            type="submit"
            variant={transactionType === "expense" ? "danger" : "primary"}
            isLoading={isAddingIncome || isAddingExpense}
          >
            Record {transactionType === "income" ? "Income" : "Expense"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
