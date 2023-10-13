/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose, { SortOrder } from "mongoose";
import { paginationHelper } from "../../../helpers/paginationHelper";
import {
  Filter,
  Pagination,
  ResponseWithPagination,
} from "../../../interfaces/databaseQuery.interface";
import ApiError from "../../../errors/ApiError";
import httpStatus from "../../../shared/httpStatus";
import { IFaculty } from "./faculty.interface";
import {
  EVENT_UPDATED_FACULTY,
  facultySearchableField,
} from "./faculty.constant";
import Faculty from "./faculty.model";
import { Name } from "../student/student.interface";
import User from "../user/user.model";
import { RedisClient } from "../../../shared/redis";

export const getFacultyService = async (
  filters: Filter,
  paginationOptions: Pagination,
): Promise<ResponseWithPagination<IFaculty[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const sortCondition: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const { searchTerm, ...filtersData } = filters;

  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      $or: facultySearchableField.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andCondition.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const whereConditions = andCondition.length ? { $and: andCondition } : {};

  const res = await Faculty.find(whereConditions)
    .populate("academicFaculty")
    .populate("academicDepartment")
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await Faculty.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: res,
  };
};

export const getFacultyByIdService = async (
  id: string,
): Promise<IFaculty | null> => {
  const res = await Faculty.findById(id)
    .populate("academicDepartment")
    .populate("academicFaculty");
  return res;
};

export const updateFacultyByIdService = async (
  id: string,
  payload: Partial<IFaculty>,
): Promise<IFaculty | null> => {
  const isExist = await Faculty.findById(id);

  if (!isExist) {
    throw new ApiError("Faculty not found by given id", httpStatus.NOT_FOUND);
  }

  const { name, ...facultyInfo } = payload;

  const updateInfo: Partial<IFaculty> = { ...facultyInfo };

  //   name object
  if (name && Object.keys(name).length > 0) {
    const nameKeys = Object.keys(name);
    nameKeys.forEach(key => {
      const nameKey = `name.${key}`;
      (updateInfo as any)[nameKey] = name[key as keyof Name];
    });
  }

  const res = await Faculty.findOneAndUpdate({ _id: id }, updateInfo, {
    new: true,
  });

  if (res) {
    RedisClient.publish(EVENT_UPDATED_FACULTY, JSON.stringify(res));
  }

  return res;
};

export const updateFacultySyncIdService = async (
  payload: any,
): Promise<IFaculty | null> => {
  const isExist = await Faculty.findOne({
    id: payload.facultyId,
  });

  if (!isExist) {
    throw new ApiError("Faculty not found by given id", httpStatus.NOT_FOUND);
  }

  const res = await Faculty.findOneAndUpdate({ _id: isExist._id }, payload, {
    new: true,
  });

  return res;
};

export const deleteFacultyByIdService = async (
  id: string,
): Promise<IFaculty | null> => {
  const session = await mongoose.startSession();

  let res;

  try {
    session.startTransaction();
    const faculty = await Faculty.findOneAndDelete({ id });

    if (!faculty) {
      throw new ApiError(
        "Faculty delete operation is failed",
        httpStatus.BAD_REQUEST,
      );
    }

    res = faculty;

    const user = await User.deleteOne({ id });

    if (!user) {
      throw new ApiError(
        "User delete operation is failed",
        httpStatus.BAD_REQUEST,
      );
    }

    session.commitTransaction();
    session.endSession();
  } catch (error) {
    session.abortTransaction();
    session.endSession();
    throw error;
  }

  return res;
};
