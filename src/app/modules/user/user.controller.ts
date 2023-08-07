import { NextFunction, Request, Response } from "express";
import * as userService from "./user.service";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { IUser } from "./user.interface";

export const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await userService.createUserService(req.body);

    sendResponse<IUser>(res, {
      statusCode: 201,
      success: true,
      message: "Successfully created user",
      data: result,
    });

    next();
  },
);
