import { Router } from "express";
import requestValidator from "../../middleware/requestValidator";
import {
  createAcademicDepartmentValidation,
  updateAcademicDepartmentValidation,
} from "./academicDepartment.validation";
import * as academicDepartmentController from "./academicDepartment.controller";

const academicDepartmentRouter = Router();

academicDepartmentRouter
  .route("/")
  .post(
    requestValidator(createAcademicDepartmentValidation),
    academicDepartmentController.createDepartment,
  )
  .get(academicDepartmentController.getDepartment);

academicDepartmentRouter
  .route("/:id")
  .get(academicDepartmentController.getDepartmentById)
  .patch(
    requestValidator(updateAcademicDepartmentValidation),
    academicDepartmentController.updateDepartmentById,
  )
  .delete(academicDepartmentController.deleteDepartmentById);

export default academicDepartmentRouter;
