import { Schema, model } from "mongoose";
import { bloodGroupEnum, genderEnum } from "../student/student.constant";
import { AdminModel, IAdmin, IAdminMethods } from "./admin.interface";

export const adminSchema = new Schema<IAdmin, AdminModel, IAdminMethods>(
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
    managementDepartment: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "ManagementDepartment",
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

    profileImage: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

const Admin = model<IAdmin, AdminModel>("Admin", adminSchema);

export default Admin;
