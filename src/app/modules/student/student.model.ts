import { Schema, model } from "mongoose";
import { IStudent, IStudentMethods, StudentModel } from "./student.interface";
import { bloodGroupEnum, genderEnum } from "./student.constant";

export const studentSchema = new Schema<
  IStudent,
  StudentModel,
  IStudentMethods
>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (value: string): boolean {
          return value.length === 9;
        },
        message: "ID must be 9 character",
      },
    },
    name: {
      firstName: {
        type: String,
        required: true,
      },
      middleName: { type: String },
      lastName: {
        type: String,
      },
    },
    gender: {
      type: String,
      required: true,
      enum: genderEnum,
    },
    dateOfBirth: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    contactNo: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (value: string): boolean {
          return value.length === 11;
        },
        message: "Contact Number must be 11 character",
      },
    },
    emergencyContactNo: {
      type: String,
      required: true,
      validate: {
        validator: function (value: string): boolean {
          return value.length === 11;
        },
        message: "Emergency Contact Number must be 11 character",
      },
    },
    presentAddress: {
      type: String,
      required: true,
    },
    permanentAddress: {
      type: String,
      required: true,
    },
    bloodGroup: {
      type: String,
      lowercase: true,
      enum: bloodGroupEnum,
    },
    guardian: {
      father: {
        name: {
          type: String,
          required: true,
        },
        occupation: {
          type: String,
          required: true,
        },
        contactNo: {
          type: String,
          required: true,
        },
      },
      mother: {
        name: {
          type: String,
          required: true,
        },
        occupation: {
          type: String,
          required: true,
        },
        contactNo: {
          type: String,
          required: true,
        },
      },
      address: {
        type: String,
        required: true,
      },
    },
    localGuardian: {
      name: {
        type: String,
        required: true,
      },
      occupation: {
        type: String,
        required: true,
      },
      contactNo: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
    },
    academicSemester: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "AcademicSemester",
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "AcademicDepartment",
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "AcademicFaculty",
    },
    profileImage: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

const Student = model<IStudent, StudentModel>("Student", studentSchema);

export default Student;
