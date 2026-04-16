import { toast } from "@heroui/react";
import { useMutation } from "@tanstack/react-query";
import { HTTPError } from "ky";
import { useRouter } from "next/navigation";
import { startTransition } from "react";

import { authService } from "../api/auth.service";
import { RegisterFormData } from "../schemas/register.schema";



export function useRegister() {
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: async (data: RegisterFormData) => {
            return await authService.register(data);
        },
        onSuccess: () => {
            toast.success("Account created successfully! Please log in.");

            // redirige a login - validar que la cuenta se creo exitosamente
            startTransition(() => {
                router.push("/login");
            });
        },
        onError: (error: unknown) => {
            if (error instanceof HTTPError) {
                const serverMessage = error.data?.error;

                if (serverMessage) {
                    toast.danger(serverMessage);
                } else {
                    switch (error.response.status) {
                        case 400:
                            toast.danger("This email is already registered.");
                            break;
                        case 401:
                            toast.danger("Invalid data provided. Please check your fields");
                            break;
                        case 429:
                            toast.danger("Too many requests. Please wait a moment.");
                            break;
                        default:
                            toast.danger("An unexpected error occurred during registration.");
                    }
                }
            } else if (error instanceof Error) {
                toast.danger("The server is currently frozen or waking up. Please try again.");
            } else {
                toast.danger("An unexpected error occurred. Please try again later.");
            }
        },
    });

    return {
        executeRegister: mutation.mutate,
        isPending: mutation.isPending, 
    };
}