import { Router } from "express";
import requestValidator from "../../middleware/requestValidator";
import * as authValidation from "./auth.validation";
import * as authController from "./auth.controller";

const authRouter = Router();

authRouter.post(
  "/login",
  requestValidator(authValidation.loginAuthValidation),
  authController.loginAuth,
);

export default authRouter;
