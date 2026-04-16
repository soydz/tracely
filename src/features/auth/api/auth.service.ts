import { api } from "@/core/config/api";
import { LoginResponse, LoginResponseSchema, RegisterResponse, RegisterResponseSchema } from "@/core/schemas/auth.schema";
import { sessionService } from "@/core/services/session.service";

import { LoginFormData } from "../schemas/login.schema";
import { RegisterFormData } from "../schemas/register.schema";

export const authService = {
  register: async (formData: RegisterFormData): Promise<RegisterResponse> => {
    const data = await api
      .post("api/v1/auth/register", {
        json: formData,
      })
      .json();

    // verifica estructura de respuesta esperada
    const response = RegisterResponseSchema.parse(data);

    return response;
  },

  login: async (credentials: LoginFormData): Promise<LoginResponse> => {
    const data = await api
      .post("api/v1/auth/login", {
        json: credentials,
      })
      .json();

    // verifica estructura de respuesta esperada
    const response = LoginResponseSchema.parse(data);

    return response;
  },

  logout: () => {
    sessionService.clearSession();

    globalThis.dispatchEvent(new CustomEvent("auth:logout"));
  },
};
