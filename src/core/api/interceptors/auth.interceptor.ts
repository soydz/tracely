
import { toast } from "@heroui/react";
import { AfterResponseState } from "ky";

import { sessionService } from "@/core/services/session.service";


export const authInterceptor = async ({
    options,
    response,
    retryCount
}: AfterResponseState) => {
    // 401: token expirado/invalido
    if (response.status === 401 && retryCount === 0) {
        sessionService.clearSession();
        globalThis.dispatchEvent(new CustomEvent("auth:logout"));
    }

    // 403: sin permisos
    if (response.status === 403) {
        globalThis.dispatchEvent(new CustomEvent("auth:unauthorized"));
    }

    // 5xx: errores criticos del servidor
    if (response.status >= 500 && retryCount === options.retry.limit) {
        toast.danger("The server is having issues. Try again later.");
    }
}