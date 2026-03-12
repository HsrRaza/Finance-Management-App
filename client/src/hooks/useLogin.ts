import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUser } from "../api/auth.api";
import useAuthStore from "../store/authStore"
export const useLogin = () => {
    const  setToken = useAuthStore((state) => state.setToken);
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ email, password }: { email: string, password: string }) => loginUser(email, password),
        onSuccess: (response) => {
            const token = response.data.token;

            setToken(token);
            localStorage.setItem("accessToken", token);


            queryClient.invalidateQueries({ queryKey: ["me"] })
        }
    })
}