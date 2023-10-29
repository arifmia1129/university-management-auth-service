import { Router } from "express";
import requestValidator from "../../middleware/requestValidator";
import * as authValidation from "./auth.validation";
import * as authController from "./auth.controller";
import auth from "../../middleware/auth";
import { USER_ROLE_ENUM } from "../../../enums/user.enum";

const authRouter = Router();

authRouter.post(
  "/login",
  requestValidator(authValidation.loginAuthValidation),
  authController.loginAuth,
);
authRouter.post("/forgot-password", authController.forgotPasswordAuth);

authRouter.get(
  "/refresh-token",
  requestValidator(authValidation.refreshTokenAuthValidation),
  authController.refreshTokenAuth,
);

authRouter.post(
  "/change-password",
  requestValidator(authValidation.changePasswordAuthValidation),
  auth(
    USER_ROLE_ENUM.SUPER_ADMIN,
    USER_ROLE_ENUM.ADMIN,
    USER_ROLE_ENUM.FACULTY,
    USER_ROLE_ENUM.STUDENT,
  ),
  authController.changePasswordAuth,
);

export default authRouter;
