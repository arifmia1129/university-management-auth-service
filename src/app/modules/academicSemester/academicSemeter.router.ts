import { Router } from "express";
import * as academicSemesterValidation from "./academicSemester.validation";
import requestValidator from "../../middleware/requestValidator";
import * as academicSemesterController from "./academicSemester.controller";

const router = Router();

router.post(
  "/create",
  requestValidator(academicSemesterValidation.createAcademicSemesterValidation),
  academicSemesterController.createSemester,
);

export default router;
