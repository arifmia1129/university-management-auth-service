/* eslint-disable @typescript-eslint/no-explicit-any */
import ApiError from "../../../errors/ApiError";
import httpStatus from "../../../shared/httpStatus";
import User from "../user/user.model";
import { LoginCredential, LoginResponse } from "./auth.constant";
import config from "../../../config";
import * as jwtHelper from "../../../helpers/jwtHelper";
import { Secret } from "jsonwebtoken";

export const loginAuthService = async (
  payload: LoginCredential,
): Promise<LoginResponse> => {
  const { id, password } = payload;

  const user = new User();

  const isUserExist = await user.isUserExist(id);

  if (!isUserExist) {
    throw new ApiError("User not found by given ID", httpStatus.NOT_FOUND);
  }

  if (!isUserExist?.password) {
    throw new ApiError("Invalid user information.", httpStatus.BAD_REQUEST);
  }

  const isPasswordMatched = await user.isPasswordMatched(
    password,
    isUserExist.password,
  );

  if (!isPasswordMatched) {
    throw new ApiError("Invalid ID or Password", httpStatus.FORBIDDEN);
  }

  const { id: userId, role, needChangePassword } = isUserExist;

  const accessToken = jwtHelper.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.secret_expires_in as string,
  );

  const refreshToken = jwtHelper.createToken(
    { userId, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_secret_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
    needChangePassword,
  };
};
