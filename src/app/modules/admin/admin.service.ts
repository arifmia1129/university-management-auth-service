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
import { Name } from "../student/student.interface";
import { IAdmin } from "./admin.interface";
import { adminSearchableField } from "./admin.constant";
import Admin from "./admin.model";
import User from "../user/user.model";

export const getAdminService = async (
  filters: Filter,
  paginationOptions: Pagination,
): Promise<ResponseWithPagination<IAdmin[]>> => {
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
      $or: adminSearchableField.map(field => ({
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

  const res = await Admin.find(whereConditions)
    .populate("managementDepartment")
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await Admin.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: res,
  };
};

export const getAdminByIdService = async (
  id: string,
): Promise<IAdmin | null> => {
  const res = await Admin.findById(id).populate("managementDepartment");
  return res;
};

export const updateAdminByIdService = async (
  id: string,
  payload: Partial<IAdmin>,
): Promise<IAdmin | null> => {
  const isExist = await Admin.findById(id);

  if (!isExist) {
    throw new ApiError("Admin not found by given id", httpStatus.NOT_FOUND);
  }

  const { name, ...AdminInfo } = payload;

  const updateInfo: Partial<IAdmin> = { ...AdminInfo };

  //   name object
  if (name && Object.keys(name).length > 0) {
    const nameKeys = Object.keys(name);
    nameKeys.forEach(key => {
      const nameKey = `name.${key}`;
      (updateInfo as any)[nameKey] = name[key as keyof Name];
    });
  }

  const res = await Admin.findOneAndUpdate({ _id: id }, updateInfo, {
    new: true,
  });

  return res;
};

export const deleteAdminByIdService = async (
  id: string,
): Promise<IAdmin | null> => {
  const session = await mongoose.startSession();

  let res;

  try {
    session.startTransaction();
    const admin = await Admin.findOneAndDelete({ id });

    if (!admin) {
      throw new ApiError(
        "Admin delete operation is failed",
        httpStatus.BAD_REQUEST,
      );
    }

    res = admin;

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
