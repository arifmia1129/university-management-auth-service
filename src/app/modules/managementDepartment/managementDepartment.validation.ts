import { z } from "zod";

export const createManagementDepartmentValidation = z.object({
  body: z.object({
    title: z.string({
      required_error: "Title is required",
    }),
  }),
});

export const updateManagementDepartmentValidation = z.object({
  body: z.object({
    title: z.string({
      required_error: "Title is required",
    }),
  }),
});
