import { NextFunction, Request, Response } from "express";
import * as academicSemesterService from "./academicSemester.service";
import { IAcademicSemester } from "./academicSemester.interface";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { Pagination } from "../../../interfaces/databaseQuery.interface";
import pick from "../../../shared/pick";
import { paginationField } from "../../constant/pagination";

export const createSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result: IAcademicSemester | null =
      await academicSemesterService.createSemesterService(req.body);

    sendResponse<IAcademicSemester>(res, {
      statusCode: 201,
      success: true,
      message: "Successfully created academic semester",
      data: result,
    });

    next();
  },
);

export const getSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const paginationOptions: Pagination = pick(req.query, paginationField);

    const result = await academicSemesterService.getSemesterService(
      paginationOptions,
    );

    sendResponse<IAcademicSemester[]>(res, {
      statusCode: 200,
      success: true,
      message: "Successfully get semester",
      meta: result.meta,
      data: result.data,
    });

    next();
  },
);
