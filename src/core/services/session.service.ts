import Cookies from "js-cookie";

import { User } from "../types/auth";
import { validateAndExtractUser } from "../utils/auth";

export const sessionService = {
    saveSession: (token: string, fullname: string): void => {
        Cookies.set("tracely_token", token, { expires: 1, secure: true, sameSite: "Strict"});
        localStorage.setItem("tracely_fullName", fullname);
    },

    // Recupera la sesión actual desde las cookies
    // Valida el token y retorna el usuario si es valido
    getSession: (): User | null => {
        const token = Cookies.get("tracely_token");
        const fullName = localStorage.getItem("tracely_fullName");
        if (!token) return null;

        return validateAndExtractUser(token, fullName || undefined);
    },

    // Elimina la sesión (cookies)
    clearSession: (): void => {
        Cookies.remove("tracely_token");
        localStorage.removeItem("tracely_fullName");
    },
};
