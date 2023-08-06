import { Router } from "express";
import * as userController from "./user.controller";
import * as userValidation from "./user.validation";
import requestValidator from "../../middleware/requestValidator";

const userRouter = Router();

userRouter.post(
  "/create-user",
  requestValidator(userValidation.createUserValidation),
  userController.createUser,
);

export default userRouter;
