import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import * as authService from "./auth.service";
import httpStatus from "../../../shared/httpStatus";
import sendResponse from "../../../shared/sendResponse";
import config from "../../../config";
import { LoginResponse, RefreshToken } from "./auth.interface";
import { JwtPayload } from "jsonwebtoken";

export const loginAuth = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.loginAuthService(req.body);

  const { refreshToken, ...other } = result;

  // set refresh token to cookie
  const cookieOption = {
    secret: config.env === "production",
    httpOnly: true,
  };

  res.cookie("refreshToken", refreshToken, cookieOption);

  sendResponse<LoginResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Log in process done successfully",
    data: other,
  });
});

export const refreshTokenAuth = catchAsync(
  async (req: Request, res: Response) => {
    const { refreshToken } = req.cookies;

    const result = await authService.refreshTokenAuthService(refreshToken);

    // const { refreshToken, ...other } = result;

    // // set refresh token to cookie
    // const cookieOption = {
    //   secret: config.env === "production",
    //   httpOnly: true,
    // };

    // res.cookie("refreshToken", refreshToken, cookieOption);

    sendResponse<RefreshToken>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Refresh token process done successfully",
      data: result,
    });
  },
);

export const changePasswordAuth = catchAsync(
  async (req: Request, res: Response) => {
    await authService.changePasswordAuthService(
      req.user as JwtPayload,
      req.body,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Password updated successfully",
    });
  },
);
