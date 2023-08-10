import { Request, Response } from "express";
import * as userService from "./user.service";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { IUser } from "./user.interface";

export const createStudent = catchAsync(async (req: Request, res: Response) => {
  const { student, ...userInfo } = req.body;

  const result = await userService.createStudentService(student, userInfo);

  sendResponse<IUser>(res, {
    statusCode: 201,
    success: true,
    message: "Successfully created student",
    data: result,
  });
});

export const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const { faculty, ...userInfo } = req.body;

  const result = await userService.createFacultyService(faculty, userInfo);

  sendResponse<IUser>(res, {
    statusCode: 201,
    success: true,
    message: "Successfully created faculty",
    data: result,
  });
});

export const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const { admin, ...userInfo } = req.body;

  const result = await userService.createAdminService(admin, userInfo);

  sendResponse<IUser>(res, {
    statusCode: 201,
    success: true,
    message: "Successfully created admin",
    data: result,
  });
});
