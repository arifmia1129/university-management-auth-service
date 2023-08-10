/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortOrder } from "mongoose";
import { paginationHelper } from "../../../helpers/paginationHelper";
import {
  Filter,
  Pagination,
  ResponseWithPagination,
} from "../../../interfaces/databaseQuery.interface";
import { Guardian, IStudent, LocalGuardian, Name } from "./student.interface";
import Student from "./student.model";
import { studentSearchableField } from "./student.constant";
import ApiError from "../../../errors/ApiError";
import httpStatus from "../../../shared/httpStatus";

export const getStudentService = async (
  filters: Filter,
  paginationOptions: Pagination,
): Promise<ResponseWithPagination<IStudent[]>> => {
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
      $or: studentSearchableField.map(field => ({
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

  const res = await Student.find(whereConditions)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await Student.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: res,
  };
};

export const getStudentByIdService = async (
  id: string,
): Promise<IStudent | null> => {
  const res = await Student.findById(id)
    .populate("academicSemester")
    .populate("academicDepartment")
    .populate("academicFaculty");
  return res;
};

export const updateStudentByIdService = async (
  id: string,
  payload: Partial<IStudent>,
): Promise<IStudent | null> => {
  const isExist = await Student.findById(id);

  if (!isExist) {
    throw new ApiError("Student not found by given id", httpStatus.NOT_FOUND);
  }

  const { name, guardian, localGuardian, ...studentInfo } = payload;

  const updateInfo: Partial<IStudent> = { ...studentInfo };

  //   name object
  if (name && Object.keys(name).length > 0) {
    const nameKeys = Object.keys(name);
    nameKeys.forEach(key => {
      const nameKey = `name.${key}`;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (updateInfo as any)[nameKey] = name[key as keyof Name];
    });
  }

  //   guardian object
  if (
    guardian &&
    Object.keys(guardian).length > 0 &&
    !guardian.father &&
    !guardian.mother
  ) {
    const guardianKeys = Object.keys(guardian);
    guardianKeys.forEach(key => {
      const guardianKey = `guardian.${key}`;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (updateInfo as any)[guardianKey] = guardian[key as keyof Guardian];
    });
  }

  // father object
  if (guardian && guardian.father && Object.keys(guardian.father).length > 0) {
    const fatherKeys = Object.keys(guardian.father);
    fatherKeys.forEach(key => {
      const guardianKey = `guardian.father.${key}`;
      // Use conditional check to ensure guardian exists before accessing its properties
      if (guardian) {
        (updateInfo as any)[guardianKey] =
          guardian.father[key as keyof typeof guardian.father];
      }
    });
  }

  // mother object
  if (guardian && guardian.mother && Object.keys(guardian.mother).length > 0) {
    const motherKeys = Object.keys(guardian.mother);
    motherKeys.forEach(key => {
      const guardianKey = `guardian.mother.${key}`;
      // Use conditional check to ensure guardian exists before accessing its properties
      if (guardian) {
        (updateInfo as any)[guardianKey] =
          guardian.mother[key as keyof typeof guardian.mother];
      }
    });
  }
  // local  guardian object
  if (localGuardian && Object.keys(localGuardian).length > 0) {
    const localGuardianKeys = Object.keys(localGuardian);
    localGuardianKeys.forEach(key => {
      const localGuardianKey = `localGuardian.${key}`;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (updateInfo as any)[localGuardianKey] =
        localGuardian[key as keyof LocalGuardian];
    });
  }

  const res = await Student.findOneAndUpdate({ _id: id }, updateInfo, {
    new: true,
  });

  return res;
};

export const deleteStudentByIdService = async (
  id: string,
): Promise<IStudent | null> => {
  const res = await Student.findByIdAndDelete(id);
  return res;
};
