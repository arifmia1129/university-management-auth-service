import { z } from "zod";
import { bloodGroupEnum, genderEnum } from "../student/student.constant";

export const updateFacultyValidation = z.object({
  name: z
    .object({
      firstName: z.string().optional(),
      middleName: z.string().optional(),
      lastName: z.string().optional(),
    })
    .optional(),
  designation: z.string().optional(),
  gender: z.enum([...genderEnum] as [string, ...string[]]).optional(),
  dateOfBirth: z.string().optional(),
  email: z.string().email().optional(),
  contactNo: z.string().optional(),
  emergencyContactNo: z.string().optional(),
  presentAddress: z.string().optional(),
  permanentAddress: z.string().optional(),
  bloodGroup: z.enum([...bloodGroupEnum] as [string, ...string[]]).optional(),
  academicSemester: z.string().optional(),
  academicFaculty: z.string().optional(),
  profileImage: z.string().url().optional(),
});