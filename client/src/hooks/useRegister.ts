import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerUser } from "../api/auth.api";

export const useRegister = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ name, email, password }: { name: string, email: string, password: string }) => registerUser(name, email, password),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["me"] })
        }
    })
}


