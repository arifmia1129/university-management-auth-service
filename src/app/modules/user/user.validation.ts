import { z } from "zod";

export const createUserValidation = z.object({
  role: z.enum(["student", "admin", "faculty"], {
    required_error: "Role is required",
  }),
  password: z.string().optional(),
});
