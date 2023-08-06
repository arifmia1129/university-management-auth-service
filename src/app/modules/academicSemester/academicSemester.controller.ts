import { Request, Response } from "express";
import * as academicSemesterService from "./academicSemester.service";
import { IAcademicSemester } from "./academicSemester.interface";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";

export const createSemester = catchAsync(
  async (req: Request, res: Response) => {
    const result: IAcademicSemester | null =
      await academicSemesterService.createSemesterService(req.body);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Successfully created academic semester",
      data: result,
    });
  },
);
