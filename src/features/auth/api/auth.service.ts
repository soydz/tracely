import { api } from "@/core/config/api";
import { LoginResponse, LoginResponseSchema } from "@/core/schemas/auth.schema";
import { sessionService } from "@/core/services/session.service";

import { LoginFormData } from "../schemas/login.schema";

export const authService = {
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
