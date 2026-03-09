import { create } from "zustand"
import { getIncomes, addIncome, deleteIncome } from "../api/income.api"

interface Income {
    _id: string
    source: string;
    amount: number;
    createdAt: Date;
}

interface IncomeState {
    incomes: Income[];
    isloading: boolean;
    error: string | null | undefined;

    fetchIncomes: () => Promise<void>;
    addIncomeActions: (source: string, amount: number) => Promise<boolean>;
    deleteIncome: (id: string) => Promise<boolean>;
    getTotalIncome: () => number;

}

const useIncomeStore = create<IncomeState>((set, get) => ({
    incomes: [],
    isloading: false,
    error: null,

    fetchIncomes: async () => {
        set({ isloading: true, error: null })
        try {
            const fetchingIncomes = await getIncomes()
            set({ incomes: fetchingIncomes, isloading: false })
        } catch (error) {
            set({ error: error instanceof Error ? error.message : "An unknown error occurred", isloading: false })
        }
    },
    addIncomeActions: async (source: string, amount: number) => {
        try {
            set({ isloading: true, error: null })
            const response = await addIncome(source, amount)

            // API returns { success: true, data: { amount, source... }, message: "..." }
            // We only want to save the 'data' part into our array
            const actualIncomeData = response.data;

            set((state) => ({
                incomes: [...state.incomes, actualIncomeData],
                isloading: false,
            }))

            console.log("SUCCESS: Added to state:", actualIncomeData);
            return true
        } catch (error) {
            set({ error: error instanceof Error ? error.message : "Failed", isloading: false })
            return false
        }
    },
    deleteIncome: async (id: string) => {
        try {
            set({ isloading: true, error: null })
            await deleteIncome(id)
            set((state) => ({
                incomes: state.incomes.filter((income) => income._id !== id),
                isloading: false
            }))
            return true
        } catch (error) {
            set({ error: error instanceof Error ? error.message : "An unknown error occurred", isloading: false })
            return false
        }
    },

    getTotalIncome: () => {
        const data = get().incomes;
        // We add a check (curr.amount || 0) just in case a property is missing
        const total = data.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);
        console.log("CALCULATING_TOTAL:", total);
        return total;
    },

   


}))

export default useIncomeStore