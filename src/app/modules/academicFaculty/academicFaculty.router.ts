import { Router } from "express";
import requestValidator from "../../middleware/requestValidator";
import {
  createAcademicFacultyValidation,
  updateAcademicFacultyValidation,
} from "./academicFaculty.validation";
import * as academicFacultyController from "./academicFaculty.controller";

const academicFacultyRouter = Router();

academicFacultyRouter
  .route("/")
  .post(
    requestValidator(createAcademicFacultyValidation),
    academicFacultyController.createFaculty,
  )
  .get(academicFacultyController.getFaculty);

academicFacultyRouter
  .route("/:id")
  .get(academicFacultyController.getFacultyById)
  .patch(
    requestValidator(updateAcademicFacultyValidation),
    academicFacultyController.updateFacultyById,
  )
  .delete(academicFacultyController.deleteFacultyById);

export default academicFacultyRouter;
