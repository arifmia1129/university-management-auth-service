import { Router } from "express";
import * as userController from "./user.controller";
import * as userValidation from "./user.validation";
import requestValidator from "../../middleware/requestValidator";

const userRouter = Router();

userRouter.post(
  "/create-student",
  requestValidator(userValidation.createStudentValidation),
  userController.createStudent,
);

userRouter.post(
  "/create-faculty",
  requestValidator(userValidation.createFacultyValidation),
  userController.createFaculty,
);

export default userRouter;
