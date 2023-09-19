import { SortOrder } from "mongoose";
import ApiError from "../../../errors/ApiError";
import { paginationHelper } from "../../../helpers/paginationHelper";
import {
  Filter,
  Pagination,
  ResponseWithPagination,
} from "../../../interfaces/databaseQuery.interface";
import httpStatus from "../../../shared/httpStatus";
import {
  academicSemesterSearchableField,
  academicSemesterTitleWithCode,
} from "./academicSemester.constant";
import {
  IAcademicSemester,
  IAcademicSemesterFromEvent,
} from "./academicSemester.interface";
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
export const createSemesterFromEventService = async (
  event: IAcademicSemesterFromEvent,
): Promise<void> => {
  const eventData = {
    year: event.year,
    title: event.title,
    code: event.code,
    startMonth: event.startMonth,
    endMonth: event.endMonth,
    syncId: event.id,
  };
  if (academicSemesterTitleWithCode[eventData.title] !== eventData.code) {
    throw new ApiError("Invalid semester code", httpStatus.BAD_REQUEST);
  }

  await AcademicSemester.create(eventData);
};

export const getSemesterService = async (
  filters: Filter,
  paginationOptions: Pagination,
): Promise<ResponseWithPagination<IAcademicSemester[]>> => {
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
      $or: academicSemesterSearchableField.map(field => ({
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

  const res = await AcademicSemester.find(whereConditions)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await AcademicSemester.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: res,
  };
};

export const getSemesterByIdService = async (
  id: string,
): Promise<IAcademicSemester | null> => {
  const res = await AcademicSemester.findById(id);
  return res;
};

export const updateSemesterByIdService = async (
  id: string,
  payload: Partial<IAcademicSemester>,
): Promise<IAcademicSemester | null> => {
  if (
    payload.title &&
    payload.code &&
    academicSemesterTitleWithCode[payload.title] !== payload.code
  ) {
    throw new ApiError("Invalid semester code", httpStatus.BAD_REQUEST);
  }
  const res = await AcademicSemester.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return res;
};
export const updateSemesterByEventService = async (
  payload: Partial<IAcademicSemesterFromEvent>,
): Promise<void> => {
  if (
    payload.title &&
    payload.code &&
    academicSemesterTitleWithCode[payload.title] !== payload.code
  ) {
    throw new ApiError("Invalid semester code", httpStatus.BAD_REQUEST);
  }
  await AcademicSemester.findOneAndUpdate({ syncId: payload?.id }, payload, {
    new: true,
  });
};
export const deleteSemesterByEventService = async (
  payload: Partial<IAcademicSemesterFromEvent>,
): Promise<void> => {
  await AcademicSemester.findOneAndDelete({ syncId: payload?.id });
};

export const deleteSemesterByIdService = async (
  id: string,
): Promise<IAcademicSemester | null> => {
  const res = await AcademicSemester.findByIdAndDelete(id);
  return res;
};
