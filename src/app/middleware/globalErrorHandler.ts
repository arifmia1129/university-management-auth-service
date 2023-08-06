import { ErrorRequestHandler } from "express";
import config from "../../config";
import { ErrorMessage } from "../../interfaces/error.interface";
import handleValidationError from "../../errors/handleValidationError";
import ApiError from "../../errors/ApiError";
import { errorLogger } from "../../shared/logger";
import { ZodError } from "zod";
import handleZodError from "../../errors/handleZodError";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // handle error logger
  errorLogger.error(err);

  //default response
  let statusCode: number = 500;
  let message: string = "Something went wrong";
  let errorMessages: ErrorMessage[] = [];

  if (err.name === "ValidationError") {
    errorMessages = handleValidationError(err);
    statusCode = 400;
    message = "Validation error";
  } else if (err instanceof ZodError) {
    errorMessages = handleZodError(err);
    statusCode = 400;
    message = "Validation error";
  } else if (err instanceof Error) {
    statusCode = 400;
    message = err.message;
    errorMessages = [
      {
        path: "",
        message: err.message,
      },
    ];
  } else if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
    errorMessages = [
      {
        path: "",
        message: err.message,
      },
    ];
  }

  res.status(statusCode).json({
    statusCode,
    success: false,
    message,
    errorMessages,
    stack: config.env === "development" ? err.stack : null,
  });

  next();
};

export default globalErrorHandler;
