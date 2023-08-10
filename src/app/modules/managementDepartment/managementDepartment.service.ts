import { SortOrder } from "mongoose";
import { paginationHelper } from "../../../helpers/paginationHelper";
import {
  Pagination,
  ResponseWithPagination,
  Filter,
} from "../../../interfaces/databaseQuery.interface";
import { IManagementDepartment } from "./managementDepartment.interface";
import ManagementDepartment from "./managementDepartment.model";
import { managementDepartmentSearchableField } from "./managementDepartment.constant";

export const createManagementDepartmentService = async (
  department: IManagementDepartment,
): Promise<IManagementDepartment | null> => {
  return await ManagementDepartment.create(department);
};

export const getManagementDepartmentService = async (
  filters: Filter,
  paginationOptions: Pagination,
): Promise<ResponseWithPagination<IManagementDepartment[]>> => {
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
      $or: managementDepartmentSearchableField.map(field => ({
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

  const res = await ManagementDepartment.find(whereConditions)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await ManagementDepartment.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: res,
  };
};

export const getManagementDepartmentByIdService = async (
  id: string,
): Promise<IManagementDepartment | null> => {
  const res = await ManagementDepartment.findById(id);
  return res;
};

export const updateManagementDepartmentByIdService = async (
  id: string,
  payload: Partial<IManagementDepartment>,
): Promise<IManagementDepartment | null> => {
  const res = await ManagementDepartment.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    },
  );
  return res;
};

export const deleteManagementDepartmentByIdService = async (
  id: string,
): Promise<IManagementDepartment | null> => {
  const res = await ManagementDepartment.findByIdAndDelete(id);
  return res;
};
