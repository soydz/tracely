import { z } from "zod";

export const LoginResponseSchema = z.object({
  token: z.string(),
  email: z.email(),
  fullName: z.string(),
});

export const JWTPayloadSchema = z.object({
  userId: z.number(),
  sub: z.email(),
  iat: z.number().optional(),
  exp: z.number(),
});

export type LoginResponse = z.infer<typeof LoginResponseSchema>;
export type JWTPayload = z.infer<typeof JWTPayloadSchema>;
