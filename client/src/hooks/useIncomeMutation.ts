import {  useMutation, useQueryClient } from "@tanstack/react-query";
import { addIncome, deleteIncome } from "../api/income.api";

export const useAddIncome = () => {
 const queryClient = useQueryClient()

   return useMutation({
    mutationFn:({source , amount}: {source: string; amount: number}) =>
         addIncome(source, amount),
      
    onSuccess:()=>{
        queryClient.invalidateQueries({
            queryKey:["incomes"]
        })
    
    }
   })
}

export const  useDeleteIncome  = ()=>{
    const queryClient = useQueryClient();


    return useMutation({
        mutationFn:(id:string)=>deleteIncome(id),

        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:["incomes"]})

        }
    })
}