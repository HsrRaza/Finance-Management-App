import {create } from "zustand"

interface IncomeUIState {
 isModelOpen: boolean,
 openModel :()=>void,
 closedModel:()=>void
}

const useIncomeStore = create<IncomeUIState>((set)=>({
    isModelOpen:false,
    openModel:()=>set({isModelOpen:true}),
    closedModel:()=>set({isModelOpen:false})
}))

export default useIncomeStore