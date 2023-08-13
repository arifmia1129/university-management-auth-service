import { z } from "zod";

export const loginAuthValidation = z.object({
  body: z.object({
    id: z.string({
      required_error: "ID is required for login",
    }),
    password: z.string({
      required_error: "Password is required for login",
    }),
  }),
});

export const refreshTokenAuthValidation = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: "Refresh token is required",
    }),
  }),
});
