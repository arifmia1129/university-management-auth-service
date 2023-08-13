import { z } from "zod";
import {
  academicSemesterCode,
  academicSemesterMonth,
  academicSemesterTitle,
} from "./academicSemester.constant";

export const createAcademicSemesterValidation = z.object({
  body: z.object({
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
  }),
});

export const updateAcademicSemesterValidation = z
  .object({
    body: z.object({
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
    }),
    // You can keep the refine logic here as well
    // But note that the "data" parameter should be "data.body"
    // and you should adjust the condition accordingly
  })
  .refine(
    data =>
      (data.body.title && data.body.code) ||
      (!data.body.title && !data.body.code),
    {
      message: "Either provide both title and code or provide neither",
    },
  );
