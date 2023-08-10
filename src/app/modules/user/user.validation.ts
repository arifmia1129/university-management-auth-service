import { z } from "zod";
import { bloodGroupEnum, genderEnum } from "../student/student.constant";

export const createStudentValidation = z.object({
  password: z.string().optional(),
  student: z.object({
    name: z.object({
      firstName: z.string({
        required_error: "First name must be required",
      }),
      middleName: z.string().optional(),
      lastName: z.string().optional(),
    }),
    gender: z.enum([...genderEnum] as [string, ...string[]], {
      required_error: "Gender is required",
    }),
    dateOfBirth: z.string({
      required_error: "Date of Birth is required",
    }),
    email: z
      .string({
        required_error: "Email is required",
      })
      .email(),
    contactNo: z.string({
      required_error: "Contact number is required",
    }),
    emergencyContactNo: z.string({
      required_error: "Emergency Contact number is required",
    }),
    presentAddress: z.string({
      required_error: "Present address is required",
    }),
    permanentAddress: z.string({
      required_error: "Permanent address is required",
    }),
    bloodGroup: z
      .enum([...bloodGroupEnum] as [string, ...string[]], {
        required_error: "Blood group is required",
      })
      .optional(),
    guardian: z.object({
      father: z.object({
        name: z.string({
          required_error: "Father name is required",
        }),
        occupation: z.string({
          required_error: "Father occupation is required",
        }),
        contactNo: z.string({
          required_error: "Father contact no is required",
        }),
      }),
      mother: z.object({
        name: z.string({
          required_error: "Mother name is required",
        }),
        occupation: z.string({
          required_error: "Mother occupation is required",
        }),
        contactNo: z.string({
          required_error: "Mother contact no is required",
        }),
      }),
      address: z.string({
        required_error: "Guardian address is required",
      }),
    }),
    localGuardian: z.object({
      name: z.string({
        required_error: "Local guardian name is required",
      }),
      occupation: z.string({
        required_error: "Local guardian occupation is required",
      }),
      contactNo: z.string({
        required_error: "Local guardian contact no is required",
      }),
      address: z.string({
        required_error: "Local guardian address is required",
      }),
    }),
    academicSemester: z.string({
      required_error: "Academic Semester is required",
    }),
    academicDepartment: z.string({
      required_error: "Academic Department is required",
    }),
    academicFaculty: z.string({
      required_error: "Academic Faculty is required",
    }),
    profileImage: z.string().url().optional(),
  }),
});

export const createFacultyValidation = z.object({
  password: z.string().optional(),
  faculty: z.object({
    name: z.object({
      firstName: z.string({
        required_error: "First name must be required",
      }),
      middleName: z.string().optional(),
      lastName: z.string().optional(),
    }),
    gender: z.enum([...genderEnum] as [string, ...string[]], {
      required_error: "Gender is required",
    }),
    dateOfBirth: z.string({
      required_error: "Date of Birth is required",
    }),
    email: z
      .string({
        required_error: "Email is required",
      })
      .email(),
    contactNo: z.string({
      required_error: "Contact number is required",
    }),
    emergencyContactNo: z.string({
      required_error: "Emergency Contact number is required",
    }),
    presentAddress: z.string({
      required_error: "Present address is required",
    }),
    permanentAddress: z.string({
      required_error: "Permanent address is required",
    }),
    bloodGroup: z
      .enum([...bloodGroupEnum] as [string, ...string[]], {
        required_error: "Blood group is required",
      })
      .optional(),
    academicDepartment: z.string({
      required_error: "Academic Department is required",
    }),
    academicFaculty: z.string({
      required_error: "Academic Faculty is required",
    }),
    profileImage: z.string().url().optional(),
  }),
});
