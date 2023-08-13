import { NextFunction, Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import * as authService from "./auth.service";
import httpStatus from "../../../shared/httpStatus";
import sendResponse from "../../../shared/sendResponse";
import { LoginResponse, RefreshToken } from "./auth.constant";
import config from "../../../config";

export const loginAuth = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
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

    next();
  },
);

export const refreshTokenAuth = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
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

    next();
  },
);
