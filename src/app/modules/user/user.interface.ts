/* eslint-disable no-unused-vars */
import { HydratedDocument, Model, Types } from "mongoose";
import { IStudent } from "../student/student.interface";

export type IUser = {
  id: string;
  role: "student" | "admin" | "faculty";
  password: string;
  changePasswordAt: Date;
  needChangePassword: boolean;
  student: Types.ObjectId | IStudent;
  faculty: Types.ObjectId | IStudent;
  admin: Types.ObjectId | IStudent;
};

export type IUserMethods = {
  isUserExist(
    id: string,
  ): Promise<Pick<
    IUser,
    "id" | "password" | "role" | "needChangePassword"
  > | null>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string,
  ): Promise<boolean>;
};

export type UserModel = {
  createWithFullName(): Promise<HydratedDocument<IUser, IUserMethods>>;
  // name: string,
} & Model<IUser, object, IUserMethods>;
