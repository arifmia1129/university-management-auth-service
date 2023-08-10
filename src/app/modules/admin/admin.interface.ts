import { HydratedDocument, Model, Types } from "mongoose";
import { Name } from "../student/student.interface";
import { IManagementDepartment } from "../managementDepartment/managementDepartment.interface";

export type IAdmin = {
  id: string;
  name: Name;
  designation: string;
  managementDepartment: Types.ObjectId | IManagementDepartment;
  gender: "male" | "female" | "other";
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  bloodGroup?: "a+" | "a-" | "b+" | "b-" | "ab+" | "ab-" | "o+" | "o-";
  profileImage?: string;
};

export type IAdminMethods = {
  fullName(): string;
};

export type AdminModel = {
  createWithFullName(): Promise<HydratedDocument<IAdmin, IAdminMethods>>;
  // name: string,
} & Model<IAdmin, object, IAdminMethods>;
