import { z } from "zod";
import { bloodGroupEnum, genderEnum } from "./student.constant";

export const updateStudentValidation = z.object({
  name: z
    .object({
      firstName: z.string().optional(),
      middleName: z.string().optional(),
      lastName: z.string().optional(),
    })
    .optional(),
  gender: z.enum([...genderEnum] as [string, ...string[]]).optional(),
  dateOfBirth: z.string().optional(),
  email: z.string().email().optional(),
  contactNo: z.string().optional(),
  emergencyContactNo: z.string().optional(),
  presentAddress: z.string().optional(),
  permanentAddress: z.string().optional(),
  bloodGroup: z.enum([...bloodGroupEnum] as [string, ...string[]]).optional(),
  guardian: z
    .object({
      father: z
        .object({
          name: z.string().optional(),
          occupation: z.string().optional(),
          contactNo: z.string().optional(),
        })
        .optional(),
      mother: z
        .object({
          name: z.string().optional(),
          occupation: z.string().optional(),
          contactNo: z.string().optional(),
        })
        .optional(),
      address: z.string().optional(),
    })
    .optional(),
  localGuardian: z
    .object({
      name: z.string().optional(),
      occupation: z.string().optional(),
      contactNo: z.string().optional(),
      address: z.string().optional(),
    })
    .optional(),
  academicSemester: z.string().optional(),
  academicDepartment: z.string().optional(),
  academicFaculty: z.string().optional(),
  profileImage: z.string().url().optional(),
});
