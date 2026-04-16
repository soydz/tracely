import Cookies from "js-cookie";
import type { BeforeRequestState } from "ky";
import ky from "ky";

import { parseEnvNumber } from "@/shared/utils";

import { authInterceptor } from "../api/interceptors/auth.interceptor";


// URL base del backend
const API_URL = process.env.NEXT_PUBLIC_API_URL;
const PUBLIC_ENDPOINTS = (process.env.NEXT_PUBLIC_PUBLIC_ENDPOINTS || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

export const apiConfig = {
  baseUrl: API_URL,
  timeout: parseEnvNumber(process.env.NEXT_PUBLIC_API_TIMEOUT, 10000),
  totalTimeout: process.env.NEXT_PUBLIC_API_TOTAL_TIMEOUT
    ? parseEnvNumber(process.env.NEXT_PUBLIC_API_TOTAL_TIMEOUT, 0)
    : (false as number | false | undefined),
  retry: {
    limit: 2,
    methods: ["get", "put", "post", "delete"],
    statusCodes: [408, 413, 429, 500, 502, 503, 504],
    // Reintenta hasta 2 veces en errores de red o 5xx
  },
  hooks: {
    beforeRequest: [
      ({ request }: BeforeRequestState) => {
        // Endpoint publico
        const isPublic = PUBLIC_ENDPOINTS.some((endpoint) =>
          request.url.includes(endpoint),
        );
        if (isPublic) return; // No agrega token

        // recuperar token
        const token = Cookies.get("tracely_token");
        if (token) {
          request.headers.set("Authorization", `Bearer ${token}`);
        }
      },
    ],
    afterResponse: [
      authInterceptor,
    ],
  },
};

export const api = ky.create(apiConfig);
