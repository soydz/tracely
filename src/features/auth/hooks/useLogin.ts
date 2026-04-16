import { toast } from "@heroui/react";
import { useMutation } from "@tanstack/react-query";
import { HTTPError } from "ky";
import { useRouter } from "next/navigation";
import { startTransition } from "react";

import { useAuth } from "@/core/contexts/AuthContext";
import { validateAndExtractUser } from "@/core/utils/auth";

import { authService } from "../api/auth.service";
import { LoginFormData } from "../schemas/login.schema";

export function useLogin() {
  const router = useRouter();
  const { login } = useAuth();

  const mutation = useMutation({
    mutationFn: async (data: LoginFormData) => {
      return await authService.login(data);
    },
    onSuccess: (response) => {
      const user = validateAndExtractUser(response.token, response.fullName);

      if (!user) {
        toast.danger("Invalid session token");
        return;
      }

      // actualiza estado global
      login(user);
      toast.success("Login successful");

      startTransition(() => {
        router.push('./dashboard');
      });
      },
    onError: (error: unknown) => {
      if (error instanceof HTTPError) {
          const serverMessage = error.data?.error;

          if (serverMessage) {
            toast.danger(serverMessage);
          } else {
            switch (error.response.status){
             case 401:
              toast.danger("Invalid credentials");
              break;
            case 429:
              toast.danger("Too many requests. Please wait a moment.");
              break;
            default:
              toast.danger("An unexpected error occurred.");
            }
          }
      }
      else if (error instanceof Error) {
        toast.danger("The server is currently frozen or waking up. Please try again in a few moments.");
      }
      else {
        toast.danger("An unexpected error occurred. Please try again later.");
      }
    },
  });
  return {
    executeLogin: mutation.mutate,
    isPending: mutation.isPending,
  };
}
