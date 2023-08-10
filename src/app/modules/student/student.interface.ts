import { HydratedDocument, Model, Types } from "mongoose";
import { IAcademicSemester } from "../academicSemester/academicSemester.interface";
import { IAcademicDepartment } from "../academicDepartment/academicDepartment.interface";
import { IAcademicFaculty } from "../academicFaculty/academicFaculty.interface";

export type Name = {
  firstName: string;
  middleName?: string;
  lastName?: string;
};

export type Guardian = {
  father: {
    name: string;
    occupation: string;
    contactNo: string;
  };
  mother: {
    name: string;
    occupation: string;
    contactNo: string;
  };
  address: string;
};

export type LocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type IStudent = {
  id: string;
  name: Name;
  gender: "male" | "female" | "other";
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  bloodGroup?: "a+" | "a-" | "b+" | "b-" | "ab+" | "ab-" | "o+" | "o-";
  guardian: Guardian;
  localGuardian: LocalGuardian;
  academicSemester: Types.ObjectId | IAcademicSemester;
  academicDepartment: Types.ObjectId | IAcademicDepartment;
  academicFaculty: Types.ObjectId | IAcademicFaculty;
  profileImage?: string;
};

export type IStudentMethods = {
  fullName(): string;
};

export type StudentModel = {
  createWithFullName(): Promise<HydratedDocument<IStudent, IStudentMethods>>;
  // name: string,
} & Model<IStudent, object, IStudentMethods>;
