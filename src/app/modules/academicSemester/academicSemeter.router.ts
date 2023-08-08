import { Router } from "express";
import * as academicSemesterValidation from "./academicSemester.validation";
import requestValidator from "../../middleware/requestValidator";
import * as academicSemesterController from "./academicSemester.controller";

const academicSemesterRouter = Router();

academicSemesterRouter.post(
  "/create",
  requestValidator(academicSemesterValidation.createAcademicSemesterValidation),
  academicSemesterController.createSemester,
);
academicSemesterRouter.get("/", academicSemesterController.getSemester);
academicSemesterRouter.get("/:id", academicSemesterController.getSemesterById);
academicSemesterRouter.patch(
  "/:id",
  requestValidator(academicSemesterValidation.updateAcademicSemesterValidation),
  academicSemesterController.updateSemesterById,
);

export default academicSemesterRouter;
