import { RequestHandler } from "express";
import * as academicSemesterService from "./academicSemester.service";
import { IAcademicSemester } from "./academicSemester.interface";

export const createSemester: RequestHandler = async (req, res, next) => {
  try {
    const result: IAcademicSemester | null =
      await academicSemesterService.createSemesterService(req.body);

    res.status(201).json({
      success: true,
      message: "Successfully created a new academic semester",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
