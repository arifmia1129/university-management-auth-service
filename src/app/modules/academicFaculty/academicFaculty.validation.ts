import { z } from "zod";

export const createAcademicFacultyValidation = z.object({
  title: z.string({
    required_error: "Title is required",
  }),
});

export const updateAcademicFacultyValidation = z.object({
  title: z.string({
    required_error: "Title is required",
  }),
});
