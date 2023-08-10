import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import {
  Pagination,
  Filter,
} from "../../../interfaces/databaseQuery.interface";
import pick from "../../../shared/pick";
import { paginationField } from "../../constant/pagination";
import * as studentService from "./student.service";
import { IStudent } from "./student.interface";
import { studentFilterableField } from "./student.constant";

export const getStudent = catchAsync(async (req: Request, res: Response) => {
  const filterData: Filter = pick(req.query, studentFilterableField);
  const paginationOptions: Pagination = pick(req.query, paginationField);

  const result = await studentService.getStudentService(
    filterData,
    paginationOptions,
  );

  sendResponse<IStudent[]>(res, {
    statusCode: 200,
    success: true,
    message: "Successfully get student",
    meta: result.meta,
    data: result.data,
  });
});

export const getStudentById = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await studentService.getStudentByIdService(id);
    sendResponse<IStudent>(res, {
      statusCode: 200,
      success: true,
      message: "Successfully get student by id",
      data: result,
    });
  },
);

export const updateStudentById = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await studentService.updateStudentByIdService(id, req.body);
    sendResponse<IStudent>(res, {
      statusCode: 200,
      success: true,
      message: "Successfully updated student",
      data: result,
    });
  },
);

export const deleteStudentById = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await studentService.deleteStudentByIdService(id);
    sendResponse<IStudent>(res, {
      statusCode: 200,
      success: true,
      message: "Successfully deleted student",
      data: result,
    });
  },
);
