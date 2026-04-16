import { decodeJwt } from "jose";

import { JWTPayloadSchema } from "@/core/schemas/auth.schema";

import { User } from "../types/auth";


export function validateAndExtractUser(token: string, fullName?: string): User | null {
    try {
        // validación del token
        const result = JWTPayloadSchema.safeParse(decodeJwt(token))

        if (!result.success) {
            return null;
        }

        // seguridad de que esta tipado  y validado en tiempo de ejecución
        const payload = result.data;

        // validadar expiración token
        const isExpired = payload.exp ? Date.now() >= payload.exp * 1000 : false;

        if (isExpired) return null;

        const email = payload.sub;

        return {
            email,
            username: email.split("@")[0],
            userId: payload.userId,
            fullName: fullName || "user",
        };
    } catch {
        return null;
    }
}