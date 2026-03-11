import { useQuery } from "@tanstack/react-query";
import { getMe } from "../api/auth.api";
import useAuthStore from "../store/authStore";

export const useMe = () => {

  const token = useAuthStore.getState().accessToken

    return useQuery({
        queryKey: ["me"],
        queryFn:getMe,
        retry:false,

        enabled:!!token
    })
}