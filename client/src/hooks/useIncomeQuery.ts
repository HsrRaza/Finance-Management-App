import { useQuery } from "@tanstack/react-query";
import { getIncomes } from "../api/income.api";

export const useIncomeQuery = () => {
   return useQuery({
    queryKey:["incomes"],
    queryFn:getIncomes,
    staleTime:1000*60*5,
   })    
}