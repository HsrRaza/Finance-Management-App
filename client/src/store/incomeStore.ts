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
    loading: boolean;
    error: string | null | undefined;

    fetchIncomes: () => Promise<void>;
    addnewIncome: (source: string, amount: number) => void;
    deleteIncome: (id: string) => void;
}

const useIncomeStore = create<IncomeState>((set) => ({
    incomes: [],
    loading: false,
    error: null,

    fetchIncomes: async () => {
        set({ loading: true, error: null })
        try {
            const fetchingIncomes = await getIncomes()
            set({ incomes:fetchingIncomes, loading: false })
        } catch (error) {
            set({ error: error instanceof Error ? error.message : "An unknown error occurred", loading: false })
        }
    },
    addnewIncome: async (source: string, amount: number) => {

        try {
            set({ loading: true, error: null })
            const newIncome = await addIncome(source, amount)

            set((state) => ({
                incomes: [...state.incomes, newIncome],
                loading: false
            }))

        } catch (error) {
            set({ error: error instanceof Error ? error.message : "An unknown error occurred", loading: false })
        }
    },
    deleteIncome: async (id: string) => {
        try {
            set({ loading: true, error: null })
            await deleteIncome(id)
            set((state) => ({
                incomes: state.incomes.filter((income) => income._id !== id),
                loading: false
            }))     
        } catch (error) {
            set({ error: error instanceof Error ? error.message : "An unknown error occurred", loading: false })
        }
    }



}))

export default useIncomeStore