import { Router } from "express";
import * as studentController from "./student.controller";
import requestValidator from "../../middleware/requestValidator";
import * as studentValidation from "./student.validation";

const studentRouter = Router();

studentRouter.get("/", studentController.getStudent);
studentRouter
  .route("/:id")
  .get(studentController.getStudentById)
  .patch(
    requestValidator(studentValidation.updateStudentValidation),
    studentController.updateStudentById,
  )
  .delete(studentController.deleteStudentById);

export default studentRouter;
