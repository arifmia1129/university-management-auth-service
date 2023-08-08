import { SortOrder } from "mongoose";
import { paginationHelper } from "../../../helpers/paginationHelper";
import {
  Pagination,
  ResponseWithPagination,
  Search,
} from "../../../interfaces/databaseQuery.interface";
import { IAcademicFaculty } from "./academicFaculty.interface";
import AcademicFaculty from "./academicFaculty.model";
import { academicFacultySearchableField } from "./academicFaculty.constant";

export const createFacultyService = async (
  faculty: IAcademicFaculty,
): Promise<IAcademicFaculty | null> => {
  return await AcademicFaculty.create(faculty);
};

export const getFacultyService = async (
  filters: Search,
  paginationOptions: Pagination,
): Promise<ResponseWithPagination<IAcademicFaculty[]>> => {
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
      $or: academicFacultySearchableField.map(field => ({
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

  const res = await AcademicFaculty.find(whereConditions)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await AcademicFaculty.countDocuments();

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
): Promise<IAcademicFaculty | null> => {
  const res = await AcademicFaculty.findById(id);
  return res;
};

export const updateFacultyByIdService = async (
  id: string,
  payload: Partial<IAcademicFaculty>,
): Promise<IAcademicFaculty | null> => {
  const res = await AcademicFaculty.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return res;
};

export const deleteFacultyByIdService = async (
  id: string,
): Promise<IAcademicFaculty | null> => {
  const res = await AcademicFaculty.findByIdAndDelete(id);
  return res;
};
