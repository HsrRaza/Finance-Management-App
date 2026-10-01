import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMeApi, loginApi, registerApi } from "../api/auth.api";
import { useAuthStore } from "../../../store/authStore";
import { queryKeys } from "../../../lib/queryKeys";
import type { LoginPayload, RegisterPayload } from "../../../types/auth";

export function useAuth() {
  const queryClient = useQueryClient();
  const { user, accessToken, isAuthenticated, setAuth, logout } = useAuthStore();

  const meQuery = useQuery({
    queryKey: queryKeys.auth.me(),
    queryFn: getMeApi,
    enabled: !!accessToken,
    retry: false,
  });

  const loginMutation = useMutation({
    mutationFn: (payload: LoginPayload) => loginApi(payload),
    onSuccess: (data) => {
      setAuth(data.user, data.token);
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.me() });
    },
  });

  const registerMutation = useMutation({
    mutationFn: (payload: RegisterPayload) => registerApi(payload),
    onSuccess: (data) => {
      if (data.token) {
        setAuth(data.user, data.token);
      }
    },
  });

  const handleLogout = () => {
    logout();
    queryClient.clear();
  };

  return {
    user: user || meQuery.data || null,
    isAuthenticated: !!accessToken && (isAuthenticated || !!user || !!meQuery.data),
    isLoading: meQuery.isLoading,
    login: loginMutation.mutateAsync,
    register: registerMutation.mutateAsync,
    logout: handleLogout,
    isLoggingIn: loginMutation.isPending,
    isRegistering: registerMutation.isPending,
    loginError: loginMutation.error ? (loginMutation.error as Error).message : null,
    registerError: registerMutation.error ? (registerMutation.error as Error).message : null,
  };
}
