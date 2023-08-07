import { SortOrder } from "mongoose";
import ApiError from "../../../errors/ApiError";
import { paginationHelper } from "../../../helpers/paginationHelper";
import {
  Pagination,
  ResponseWithPagination,
} from "../../../interfaces/databaseQuery.interface";
import httpStatus from "../../../shared/httpStatus";
import { academicSemesterTitleWithCode } from "./academicSemester.constant";
import { IAcademicSemester } from "./academicSemester.interface";
import AcademicSemester from "./academicSemester.model";

export const createSemesterService = async (
  semester: IAcademicSemester,
): Promise<IAcademicSemester | null> => {
  if (academicSemesterTitleWithCode[semester.title] !== semester.code) {
    throw new ApiError("Invalid semester code", httpStatus.BAD_REQUEST);
  }

  const res = await AcademicSemester.create(semester);
  return res;
};

export const getSemesterService = async (
  options: Pagination,
): Promise<ResponseWithPagination<IAcademicSemester[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(options);

  const sortCondition: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const res = await AcademicSemester.find()
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await AcademicSemester.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: res,
  };
};
