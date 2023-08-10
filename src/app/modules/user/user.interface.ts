import { HydratedDocument, Model, Types } from "mongoose";
import { IStudent } from "../student/student.interface";

export type IUser = {
  id: string;
  role: "student" | "admin" | "faculty";
  password: string;
  student: Types.ObjectId | IStudent;
};

export type IUserMethods = {
  fullName(): string;
};

export type UserModel = {
  createWithFullName(): Promise<HydratedDocument<IUser, IUserMethods>>;
  // name: string,
} & Model<IUser, object, IUserMethods>;
