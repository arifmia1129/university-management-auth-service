import { HydratedDocument, Model, Types } from "mongoose";
import { Name } from "../student/student.interface";
import { IAcademicDepartment } from "../academicDepartment/academicDepartment.interface";
import { IAcademicFaculty } from "../academicFaculty/academicFaculty.interface";

export type IFaculty = {
  id: string;
  syncId?: string;
  name: Name;
  designation: string;
  gender: "male" | "female" | "other";
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  bloodGroup?: "a+" | "a-" | "b+" | "b-" | "ab+" | "ab-" | "o+" | "o-";
  academicDepartment: Types.ObjectId | IAcademicDepartment;
  academicFaculty: Types.ObjectId | IAcademicFaculty;
  profileImage?: string;
};

export type IFacultyMethods = {
  fullName(): string;
};

export type FacultyModel = {
  createWithFullName(): Promise<HydratedDocument<IFaculty, IFacultyMethods>>;
  // name: string,
} & Model<IFaculty, object, IFacultyMethods>;
