import mongoose from "mongoose";
import config from "../../../config";
import ApiError from "../../../errors/ApiError";
import AcademicSemester from "../academicSemester/academicSemester.model";
import { IStudent } from "../student/student.interface";
import { IUser } from "./user.interface";
import User from "./user.model";
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from "./user.utils";
import httpStatus from "../../../shared/httpStatus";
import Student from "../student/student.model";
import { IFaculty } from "../faculty/faculty.interface";
import Faculty from "../faculty/faculty.model";
import { IAdmin } from "../admin/admin.interface";
import Admin from "../admin/admin.model";

export const createStudentService = async (
  student: IStudent,
  user: IUser,
): Promise<IUser | null> => {
  // if user don't give password use default password
  if (!user.password) {
    user.password = config.default_user_pass as string;
  }

  // set role
  user.role = "student";

  // start session -> start transaction -> (commit transaction and end session) or (abort transaction and end session)

  let userInfo;

  // start a session
  const session = await mongoose.startSession();

  try {
    // start transaction
    session.startTransaction();

    // find academic semester by id
    const academicSemester = await AcademicSemester.findById(
      student.academicSemester,
    );

    // throw error if academic semester not found
    if (!academicSemester) {
      throw new ApiError(
        "Academic semester not found by giving id",
        httpStatus.BAD_REQUEST,
      );
    }

    // try to generate new student id
    const id = await generateStudentId(academicSemester);

    // throw error if generate id process is failed
    if (!id) {
      throw new ApiError(
        "Failed to generate new student id",
        httpStatus.BAD_REQUEST,
      );
    }

    // set id
    student.id = id;
    user.id = id;

    // try to create a new student
    const newStudent = await Student.create([student], { session });

    // throw error if new student not created
    // remember newStudent return an array
    if (!newStudent.length) {
      throw new ApiError(
        "Failed to create a new student",
        httpStatus.BAD_REQUEST,
      );
    }

    // set student _id to user for reference
    // remember newStudent return an array
    user.student = newStudent[0]._id;

    // try to create new user
    const newUser = await User.create([user], { session });

    userInfo = newUser[0];

    // throw error when failed to create user
    if (!newUser.length) {
      throw new ApiError("Failed to create a new user", httpStatus.BAD_REQUEST);
    }

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (userInfo) {
    userInfo = await User.findOne({ id: userInfo.id }).populate({
      path: "student",
      populate: [
        {
          path: "academicSemester",
        },
        {
          path: "academicFaculty",
        },
        {
          path: "academicDepartment",
        },
      ],
    });
  }
  return userInfo || null;
};

export const createFacultyService = async (
  faculty: IFaculty,
  user: IUser,
): Promise<IUser | null> => {
  // if user don't give password use default password
  if (!user.password) {
    user.password = config.default_user_pass as string;
  }

  // set role
  user.role = "faculty";

  // start session -> start transaction -> (commit transaction and end session) or (abort transaction and end session)

  let userInfo;

  // start a session
  const session = await mongoose.startSession();

  try {
    // start transaction
    session.startTransaction();

    // try to generate new student id
    const id = await generateFacultyId();

    // throw error if generate id process is failed
    if (!id) {
      throw new ApiError(
        "Failed to generate new faculty id",
        httpStatus.BAD_REQUEST,
      );
    }

    // set id
    faculty.id = id;
    user.id = id;

    // try to create a new faculty
    const newFaculty = await Faculty.create([faculty], { session });

    // throw error if new faculty not created
    // remember new faculty return an array
    if (!newFaculty.length) {
      throw new ApiError(
        "Failed to create a new faculy",
        httpStatus.BAD_REQUEST,
      );
    }

    // set faculty _id to user for reference
    // remember new faculty return an array
    user.faculty = newFaculty[0]._id;

    // try to create new user
    const newUser = await User.create([user], { session });

    userInfo = newUser[0];

    // throw error when failed to create user
    if (!newUser.length) {
      throw new ApiError("Failed to create a new user", httpStatus.BAD_REQUEST);
    }

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (userInfo) {
    userInfo = await User.findOne({ id: userInfo.id }).populate({
      path: "faculty",
      populate: [
        {
          path: "academicFaculty",
        },
        {
          path: "academicDepartment",
        },
      ],
    });
  }
  return userInfo || null;
};

export const createAdminService = async (
  admin: IAdmin,
  user: IUser,
): Promise<IUser | null> => {
  // if user don't give password use default password
  if (!user.password) {
    user.password = config.default_user_pass as string;
  }

  // set role
  user.role = "admin";

  // start session -> start transaction -> (commit transaction and end session) or (abort transaction and end session)

  let userInfo;

  // start a session
  const session = await mongoose.startSession();

  try {
    // start transaction
    session.startTransaction();

    // try to generate new student id
    const id = await generateAdminId();

    // throw error if generate id process is failed
    if (!id) {
      throw new ApiError(
        "Failed to generate new admin id",
        httpStatus.BAD_REQUEST,
      );
    }

    // set id
    admin.id = id;
    user.id = id;

    // try to create a new admin
    const newAdmin = await Admin.create([admin], { session });

    // throw error if new admin not created
    // remember new admin return an array
    if (!newAdmin.length) {
      throw new ApiError(
        "Failed to create a new admin",
        httpStatus.BAD_REQUEST,
      );
    }

    // set faculty _id to user for reference
    // remember new faculty return an array
    user.admin = newAdmin[0]._id;

    // try to create new user
    const newUser = await User.create([user], { session });

    userInfo = newUser[0];

    // throw error when failed to create user
    if (!newUser.length) {
      throw new ApiError("Failed to create a new user", httpStatus.BAD_REQUEST);
    }

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (userInfo) {
    userInfo = await User.findOne({ id: userInfo.id }).populate("admin");
  }
  return userInfo || null;
};
