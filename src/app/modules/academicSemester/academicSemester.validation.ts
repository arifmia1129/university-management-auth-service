import { z } from "zod";
import {
  academicSemesterCode,
  academicSemesterMonth,
  academicSemesterTitle,
} from "./academicSemester.constant";

export const createAcademicSemesterValidation = z.object({
  title: z.enum([...academicSemesterTitle] as [string, ...string[]], {
    required_error: "Title is required",
  }),
  year: z.string({
    required_error: "Year is required",
  }),
  code: z.enum([...academicSemesterCode] as [string, ...string[]], {
    required_error: "Code is required",
  }),
  startMonth: z.enum([...academicSemesterMonth] as [string, ...string[]], {
    required_error: "Start month is required",
  }),
  endMonth: z.enum([...academicSemesterMonth] as [string, ...string[]], {
    required_error: "End month is required",
  }),
});

export const updateAcademicSemesterValidation = z
  .object({
    title: z
      .enum([...academicSemesterTitle] as [string, ...string[]], {
        required_error: "Title is required",
      })
      .optional(),
    year: z
      .string({
        required_error: "Year is required",
      })
      .optional(),
    code: z
      .enum([...academicSemesterCode] as [string, ...string[]], {
        required_error: "Code is required",
      })
      .optional(),
    startMonth: z
      .enum([...academicSemesterMonth] as [string, ...string[]], {
        required_error: "Start month is required",
      })
      .optional(),
    endMonth: z
      .enum([...academicSemesterMonth] as [string, ...string[]], {
        required_error: "End month is required",
      })
      .optional(),
  })
  .refine(data => (data.title && data.code) || (!data.title && !data.code), {
    message: "Either provided both title and code neither provided not",
  });
