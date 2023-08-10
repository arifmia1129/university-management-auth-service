import { Router } from "express";
import requestValidator from "../../middleware/requestValidator";
import * as adminController from "./admin.controller";
import * as adminValidation from "./admin.validation";

const adminRouter = Router();

adminRouter.get("/", adminController.getAdmin);
adminRouter
  .route("/:id")
  .get(adminController.getAdminById)
  .patch(
    requestValidator(adminValidation.updateAdminValidation),
    adminController.updateAdminById,
  )
  .delete(adminController.deleteAdminById);

export default adminRouter;
