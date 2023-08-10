import { Router } from "express";
import requestValidator from "../../middleware/requestValidator";
import * as managementDepartmentController from "./managementDepartment.controller";
import {
  createManagementDepartmentValidation,
  updateManagementDepartmentValidation,
} from "./managementDepartment.validation";

const managementDepartmentRouter = Router();

managementDepartmentRouter.post(
  "/create-management",
  requestValidator(createManagementDepartmentValidation),
  managementDepartmentController.createManagementDepartment,
);
managementDepartmentRouter.get(
  "/",
  managementDepartmentController.getManagementDepartment,
);

managementDepartmentRouter
  .route("/:id")
  .get(managementDepartmentController.getManagementDepartmentById)
  .patch(
    requestValidator(updateManagementDepartmentValidation),
    managementDepartmentController.updateManagementDepartmentById,
  )
  .delete(managementDepartmentController.deleteManagementDepartmentById);

export default managementDepartmentRouter;
