import { z } from "zod";

export const createAcademicDepartmentValidation = z.object({
  title: z.string({
    required_error: "Title is required",
  }),
  academicFaculty: z.string({
    required_error: "Academic Faculty id is required",
  }),
});

export const updateAcademicDepartmentValidation = z.object({
  title: z
    .string({
      required_error: "Title is required",
    })
    .optional(),
  academicFaculty: z
    .string({
      required_error: "Academic Faculty id is required",
    })
    .optional(),
});
