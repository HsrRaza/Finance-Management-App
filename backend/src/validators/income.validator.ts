import { z } from "zod";

export const addIncomeSchema = z.object({
  source: z.string().min(1, "Source is required"),
  amount: z.number().positive("Amount must be greater than 0"),
  date: z.string().optional(),
  icon: z.string().optional(),
});
