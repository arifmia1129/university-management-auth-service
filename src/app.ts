import express, { Application, Request, Response } from "express";
import cors from "cors";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import router from "./app/routes";

const app: Application = express();

// parse
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cors
app.use(cors());

// router
app.use("/api/v1", router);

app.get("/", async (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Server is running successfully",
  });
});

// global error handler
app.use(globalErrorHandler);

export default app;
