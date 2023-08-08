import { SortOrder } from "mongoose";
import { paginationHelper } from "../../../helpers/paginationHelper";
import {
  Pagination,
  ResponseWithPagination,
  Search,
} from "../../../interfaces/databaseQuery.interface";
import { IAcademicDepartment } from "./academicDepartment.interface";
import AcademicDepartment from "./academicDepartment.model";
import { academicDepartmentSearchableField } from "./academicDepartment.constant";

export const createDepartmentService = async (
  department: IAcademicDepartment,
): Promise<IAcademicDepartment | null> => {
  return (await AcademicDepartment.create(department)).populate(
    "academicFaculty",
  );
};

export const getDepartmentService = async (
  filters: Search,
  paginationOptions: Pagination,
): Promise<ResponseWithPagination<IAcademicDepartment[]>> => {
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
      $or: academicDepartmentSearchableField.map(field => ({
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

  const res = await AcademicDepartment.find(whereConditions)
    .populate("academicFaculty")
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await AcademicDepartment.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: res,
  };
};

export const getDepartmentByIdService = async (
  id: string,
): Promise<IAcademicDepartment | null> => {
  const res = await AcademicDepartment.findById(id).populate("academicFaculty");
  return res;
};

export const updateDepartmentByIdService = async (
  id: string,
  payload: Partial<IAcademicDepartment>,
): Promise<IAcademicDepartment | null> => {
  const res = await AcademicDepartment.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  }).populate("academicFaculty");
  return res;
};

export const deleteDepartmentByIdService = async (
  id: string,
): Promise<IAcademicDepartment | null> => {
  const res = await AcademicDepartment.findByIdAndDelete(id).populate(
    "academicFaculty",
  );
  return res;
};
