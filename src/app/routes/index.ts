import { Router } from "express";
import userRouter from "../modules/user/user.router";
import academicSemesterRouter from "../modules/academicSemester/academicSemeter.router";

const router = Router();

const moduleRoutes = [
  { path: "/user", route: userRouter },
  { path: "/academic-semester", route: academicSemesterRouter },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
