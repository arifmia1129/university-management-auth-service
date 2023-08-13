import { z } from "zod";

export const loginAuthValidation = z.object({
  id: z.string({
    required_error: "ID is required for login",
  }),
  password: z.string({
    required_error: "Password is required for login",
  }),
});
