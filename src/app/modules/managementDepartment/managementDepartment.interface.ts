import { HydratedDocument, Model } from "mongoose";

export type IManagementDepartment = {
  title: string;
};

export type IManagementDepartmentMethods = {
  fullName(): string;
};

export type ManagementDepartmentModel = {
  createWithFullName(): Promise<
    HydratedDocument<IManagementDepartment, IManagementDepartmentMethods>
  >;
  // name: string,
} & Model<IManagementDepartment, object, IManagementDepartmentMethods>;
