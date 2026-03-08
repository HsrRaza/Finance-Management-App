import { create } from "zustand"
import { addExpense, deleteExpense, getExpenses } from "../api/expense.api"

interface Expense {
    _id: string;
    category: string;
    amount: number;
    date: Date;
}
interface ExpenseStore {
    expense: Expense[];
    loading: boolean;
    error: string | null | undefined

    fetchExpense: () => Promise<void>
    addnewExpense: (category: string, amount: number) => Promise<void>
    deleteExpense: (id: string) => Promise<void>
}

const useExpenseStore = create<ExpenseStore>((set) => ({
    expense: [],
    loading: false,
    error: null,

    fetchExpense: async () => {
        set({ loading: true, error: null });
        try {
            const fetchingExpense = await getExpenses();
            set({ expense: fetchingExpense, loading: false });
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : "An unknown error occurred",
                loading: false
            });
        }
    },

    addnewExpense: async (category: string, amount: number) => {
        set({ loading: true, error: null })
        try {
            const newExpense = await addExpense(category, amount)

            set((state) => ({
                expense: [...state.expense, newExpense],
                loading: false
            }))
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : "An Unknown error occured",
                loading: false
            });

        }
    },
    deleteExpense: async (id: string) => {
  try {
            set({ loading: true, error: null })
            await deleteExpense(id)
            set((state) => ({
                incomes: state.expense.filter((expense) => expense._id !== id),
                loading: false
            }))     
        } catch (error) {
            set({ error: error instanceof Error ? error.message : "An unknown error occurred", loading: false })
        }
    }


}));

export default useExpenseStore