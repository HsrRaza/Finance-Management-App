import { useQuery } from "@tanstack/react-query";
import { getIncomes } from "../api/income.api";

export const useIncomeQuery = () => {
   return useQuery({
    queryKey:["income"],
    queryFn:getIncomes,
    staleTime:1000*60*5,
   })    
}