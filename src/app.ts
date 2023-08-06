import express, { Application, Request, Response } from "express";
import cors from "cors";
import userRouter from "./app/modules/user/user.router";
import academicSemesterRouter from "./app/modules/academicSemester/academicSemeter.router";
import globalErrorHandler from "./app/middleware/globalErrorHandler";

const app: Application = express();

// parse
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cors
app.use(cors());

// router
app.use("/api/v1/user", userRouter);
app.use("/api/v1/academic-semester", academicSemesterRouter);

app.get("/", async (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Server is running successfully",
  });
});

// global error handler
app.use(globalErrorHandler);

export default app;
