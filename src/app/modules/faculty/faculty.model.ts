import { Schema, model } from "mongoose";
import { FacultyModel, IFaculty, IFacultyMethods } from "./faculty.interface";
import { bloodGroupEnum, genderEnum } from "../student/student.constant";

export const facultySchema = new Schema<
  IFaculty,
  FacultyModel,
  IFacultyMethods
>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (value: string): boolean {
          return value.length === 7;
        },
        message: "ID must be 7 character",
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
    designation: {
      type: String,
      required: true,
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

const Faculty = model<IFaculty, FacultyModel>("Faculty", facultySchema);

export default Faculty;
