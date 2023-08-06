import { z } from 'zod'

export const createUserValidation = z.object({
  role: z.string({
    required_error: 'Role is required',
  }),
  password: z.string().optional(),
})
