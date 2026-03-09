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
    getTotalExpense: () => number;
    getWeeklyExpense: () => number;
    getTodayExpense: () => number;
}

const useExpenseStore = create<ExpenseStore>((set,get) => ({
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
    },

    getTotalExpense: () => {
        const data = get().expense;
        // We add a check (curr.amount || 0) just in case a property is missing
        const total = data.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);
        console.log("CALCULATING_TOTAL:", total);
        return total;
    },

    getWeeklyExpense: () => {
        const now = new Date();
        const sevenDays = new Date();
        sevenDays.setDate(now.getDate() - 7);

        const data = get().expense;
        const filtered = data.filter(item => new Date(item.date) >= sevenDays);
        const weeklyTotal = filtered.reduce((acc, curr) => acc + curr.amount, 0);

        console.log("CALCULATING_WEEKLY:", weeklyTotal);
        return weeklyTotal;
    },

    getTodayExpense: () => {
        const todayStr = new Date().toDateString();
        const data = get().expense;

        const filtered = data.filter(item => {
            // Must convert createdAt string to Date object to use .toDateString()
            return new Date(item.date).toDateString() === todayStr;
        });

        const todayTotal = filtered.reduce((acc, curr) => acc + curr.amount, 0);
        console.log("CALCULATING_TODAY:", todayTotal);
        return todayTotal;
    },


}));

export default useExpenseStore