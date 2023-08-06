import { Request, Response } from "express";
import * as userService from "./user.service";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";

export const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.createUserService(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Successfully created user",
    data: result,
  });
});
