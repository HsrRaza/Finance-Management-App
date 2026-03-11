import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUser } from "../api/auth.api";

export const useLogin = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ email, password }: { email: string, password: string }) => loginUser(email, password),
        onSuccess: (response) => {
            localStorage.setItem("accessToken", response.data.token);
            queryClient.invalidateQueries({ queryKey: ["me"] })
        }
    })
}