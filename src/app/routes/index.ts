import { Router } from "express";
import userRouter from "../modules/user/user.router";
import academicSemesterRouter from "../modules/academicSemester/academicSemester.router";
import academicFacultyRouter from "../modules/academicFaculty/academicFaculty.router";
import academicDepartmentRouter from "../modules/academicDepartment/academicDepartment.router";

const router = Router();

const moduleRoutes = [
  { path: "/user", route: userRouter },
  { path: "/academic-semester", route: academicSemesterRouter },
  { path: "/academic-faculty", route: academicFacultyRouter },
  { path: "/academic-department", route: academicDepartmentRouter },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
