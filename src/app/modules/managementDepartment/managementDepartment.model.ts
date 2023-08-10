import { Schema, model } from "mongoose";
import {
  IManagementDepartment,
  IManagementDepartmentMethods,
  ManagementDepartmentModel,
} from "./managementDepartment.interface";

export const managementDepartmentSchema = new Schema<
  IManagementDepartment,
  ManagementDepartmentModel,
  IManagementDepartmentMethods
>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

const ManagementDepartment = model<
  IManagementDepartment,
  ManagementDepartmentModel
>("ManagementDepartment", managementDepartmentSchema);

export default ManagementDepartment;
