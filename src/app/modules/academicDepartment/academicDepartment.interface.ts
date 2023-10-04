import { HydratedDocument, Model, Types } from "mongoose";
import { IAcademicFaculty } from "../academicFaculty/academicFaculty.interface";

export type IAcademicDepartment = {
  title: string;
  academicFaculty: Types.ObjectId | IAcademicFaculty;
  syncId: string;
};

export type IAcademicDepartmentMethods = {
  fullName(): string;
};

export type AcademicDepartmentModel = {
  createWithFullName(): Promise<
    HydratedDocument<IAcademicDepartment, IAcademicDepartmentMethods>
  >;
  // name: string,
} & Model<IAcademicDepartment, object, IAcademicDepartmentMethods>;

export type IAcademicDepartmentFromEvent = {
  title: string;
  academicFaculty: Types.ObjectId | IAcademicFaculty;
  id: string;
};
