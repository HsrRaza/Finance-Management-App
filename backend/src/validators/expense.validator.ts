import { z } from "zod";

export const addExpenseSchema = z.object({
  category: z.string().min(1, "Category is required"),
  amount: z.number().positive("Amount must be greater than 0"),
  title: z.string().optional(),
  date: z.string().optional(),
  icon: z.string().optional(),
});
