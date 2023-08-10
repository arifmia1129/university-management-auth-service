import { Router } from "express";
import * as facultyController from "./faculty.controller";
import requestValidator from "../../middleware/requestValidator";
import * as facultyValidation from "./faculty.validation";

const facultyRouter = Router();

facultyRouter.get("/", facultyController.getFaculty);
facultyRouter
  .route("/:id")
  .get(facultyController.getFacultyById)
  .patch(
    requestValidator(facultyValidation.updateFacultyValidation),
    facultyController.updateFacultyById,
  )
  .delete(facultyController.deleteFacultyById);

export default facultyRouter;
