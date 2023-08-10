import { Request, Response } from "express";
import * as academicSemesterService from "./academicSemester.service";
import { IAcademicSemester } from "./academicSemester.interface";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import {
  Pagination,
  Filter,
} from "../../../interfaces/databaseQuery.interface";
import pick from "../../../shared/pick";
import { paginationField } from "../../constant/pagination";
import { academicSemesterFilterableField } from "./academicSemester.constant";

export const createSemester = catchAsync(
  async (req: Request, res: Response) => {
    const result: IAcademicSemester | null =
      await academicSemesterService.createSemesterService(req.body);

    sendResponse<IAcademicSemester>(res, {
      statusCode: 201,
      success: true,
      message: "Successfully created academic semester",
      data: result,
    });
  },
);

export const getSemester = catchAsync(async (req: Request, res: Response) => {
  const filterData: Filter = pick(req.query, academicSemesterFilterableField);
  const paginationOptions: Pagination = pick(req.query, paginationField);

  const result = await academicSemesterService.getSemesterService(
    filterData,
    paginationOptions,
  );

  sendResponse<IAcademicSemester[]>(res, {
    statusCode: 200,
    success: true,
    message: "Successfully get semester",
    meta: result.meta,
    data: result.data,
  });
});

export const getSemesterById = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await academicSemesterService.getSemesterByIdService(id);
    sendResponse<IAcademicSemester>(res, {
      statusCode: 200,
      success: true,
      message: "Successfully get semester",
      data: result,
    });
  },
);

export const updateSemesterById = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await academicSemesterService.updateSemesterByIdService(
      id,
      req.body,
    );
    sendResponse<IAcademicSemester>(res, {
      statusCode: 200,
      success: true,
      message: "Successfully updated semester",
      data: result,
    });
  },
);

export const deleteSemesterById = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await academicSemesterService.deleteSemesterByIdService(id);
    sendResponse<IAcademicSemester>(res, {
      statusCode: 200,
      success: true,
      message: "Successfully deleted semester",
      data: result,
    });
  },
);
