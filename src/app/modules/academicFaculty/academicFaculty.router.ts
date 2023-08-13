import { Router } from "express";
import requestValidator from "../../middleware/requestValidator";
import {
  createAcademicFacultyValidation,
  updateAcademicFacultyValidation,
} from "./academicFaculty.validation";
import * as academicFacultyController from "./academicFaculty.controller";
import auth from "../../middleware/auth";
import { USER_ROLE_ENUM } from "../../../enums/user.enum";

const academicFacultyRouter = Router();

academicFacultyRouter
  .route("/")
  .post(
    requestValidator(createAcademicFacultyValidation),
    auth(USER_ROLE_ENUM.SUPER_ADMIN, USER_ROLE_ENUM.ADMIN),
    academicFacultyController.createFaculty,
  )
  .get(
    auth(
      USER_ROLE_ENUM.SUPER_ADMIN,
      USER_ROLE_ENUM.ADMIN,
      USER_ROLE_ENUM.FACULTY,
      USER_ROLE_ENUM.STUDENT,
    ),
    academicFacultyController.getFaculty,
  );

academicFacultyRouter
  .route("/:id")
  .get(
    auth(
      USER_ROLE_ENUM.SUPER_ADMIN,
      USER_ROLE_ENUM.ADMIN,
      USER_ROLE_ENUM.FACULTY,
      USER_ROLE_ENUM.STUDENT,
    ),
    academicFacultyController.getFacultyById,
  )
  .patch(
    requestValidator(updateAcademicFacultyValidation),
    auth(
      USER_ROLE_ENUM.SUPER_ADMIN,
      USER_ROLE_ENUM.ADMIN,
      USER_ROLE_ENUM.FACULTY,
    ),
    academicFacultyController.updateFacultyById,
  )
  .delete(
    auth(USER_ROLE_ENUM.SUPER_ADMIN, USER_ROLE_ENUM.ADMIN),
    academicFacultyController.deleteFacultyById,
  );

export default academicFacultyRouter;
