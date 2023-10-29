/* eslint-disable @typescript-eslint/no-explicit-any */
import ApiError from "../../../errors/ApiError";
import httpStatus from "../../../shared/httpStatus";
import User from "../user/user.model";
import {
  ChangePassword,
  LoginCredential,
  LoginResponse,
  RefreshToken,
} from "./auth.interface";
import config from "../../../config";
import * as jwtHelper from "../../../helpers/jwtHelper";
import { JwtPayload, Secret } from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Admin from "../admin/admin.model";
import Faculty from "../faculty/faculty.model";
import Student from "../student/student.model";
import sendEmail from "../../../utils/sendEmail";

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

export const refreshTokenAuthService = async (
  token: string,
): Promise<RefreshToken> => {
  const verifiedToken = jwtHelper.verifyAndDecodeToken(
    token,
    config.jwt.refresh_secret as Secret,
  );

  const { userId, role } = verifiedToken;

  const user = new User();

  const isUserExist = await user.isUserExist(userId);

  if (!isUserExist) {
    throw new ApiError("User does not exist", httpStatus.FORBIDDEN);
  }

  if (!isUserExist?.password) {
    throw new ApiError("Invalid user information.", httpStatus.BAD_REQUEST);
  }

  if (isUserExist.role !== role) {
    throw new ApiError("User role is mismatched", httpStatus.FORBIDDEN);
  }

  const accessToken = jwtHelper.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.secret_expires_in as string,
  );

  return {
    accessToken,
  };
};

export const changePasswordAuthService = async (
  userInfo: JwtPayload,
  payload: ChangePassword,
): Promise<void> => {
  const { oldPassword, newPassword } = payload;
  const { userId } = userInfo;

  const user = new User();

  const isUserExist = await user.isUserExist(userId);

  if (!isUserExist) {
    throw new ApiError("User not found", httpStatus.NOT_FOUND);
  }

  if (!isUserExist?.password) {
    throw new ApiError("Invalid user information.", httpStatus.BAD_REQUEST);
  }

  const isPasswordMatched = await user.isPasswordMatched(
    oldPassword,
    isUserExist.password,
  );

  if (!isPasswordMatched) {
    throw new ApiError("Invalid old Password", httpStatus.FORBIDDEN);
  }

  const newHashedPassword = await bcrypt.hash(
    newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  const updateInfo = {
    password: newHashedPassword,
    needChangePassword: false,
    changePasswordAt: new Date(),
  };

  await User.findOneAndUpdate({ id: userId }, updateInfo, {
    runValidators: true,
  });
};

export const forgotPasswordService = async (userId: string) => {
  const isUserExist = await User.findOne(
    { id: userId },
    { id: 1, role: 1, _id: 0 },
  );

  if (!isUserExist) {
    throw new ApiError("User not found", httpStatus.NOT_FOUND);
  }

  const { id, role } = isUserExist;

  let profile;

  if (role === "admin") {
    profile = await Admin.findOne({ id });
  } else if (role === "faculty") {
    profile = await Faculty.findOne({ id });
  } else if (role === "student") {
    profile = await Student.findOne({ id });
  }

  if (!profile) {
    throw new ApiError("Profile information not found", httpStatus.NOT_FOUND);
  }

  const resetToken = await jwtHelper.createToken(
    { userId: id, role },
    config.jwt.secret as Secret,
    config.jwt.secret_expires_in as string,
  );

  await sendEmail(
    profile?.name.firstName +
      " " +
      profile?.name.middleName +
      " " +
      profile?.name.lastName,
    profile?.email as string,
    `http://localhost:5000/api/v1/reset-password?token=${resetToken}`,
  );
};

export const resetPassword = async (payload: any) => {
  const { token, newPassword } = payload;

  const { userId } = await jwtHelper.verifyAndDecodeToken(
    token,
    config.jwt.secret as string,
  );
  const isUserExist = await User.findOne({ id: userId });

  if (!isUserExist) {
    throw new ApiError("User not found", httpStatus.NOT_FOUND);
  }

  const newHashedPassword = await bcrypt.hash(
    newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  await User.updateOne({ id: userId }, { password: newHashedPassword });
};
