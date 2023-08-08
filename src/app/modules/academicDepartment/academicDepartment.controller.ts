import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import {
  Pagination,
  Search,
} from "../../../interfaces/databaseQuery.interface";
import pick from "../../../shared/pick";
import * as academicDepartmentService from "./academicDepartment.service";
import { IAcademicDepartment } from "./academicDepartment.interface";
import { academicDepartmentFilterableField } from "./academicDepartment.constant";
import { paginationField } from "../../constant/pagination";

export const createDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const result = await academicDepartmentService.createDepartmentService(
      req.body,
    );

    sendResponse<IAcademicDepartment>(res, {
      statusCode: 201,
      success: true,
      message: "Successfully created academic Department",
      data: result,
    });
  },
);

export const getDepartment = catchAsync(async (req: Request, res: Response) => {
  const searchTerm: Search = pick(req.query, academicDepartmentFilterableField);
  const paginationOptions: Pagination = pick(req.query, paginationField);

  const result = await academicDepartmentService.getDepartmentService(
    searchTerm,
    paginationOptions,
  );

  sendResponse<IAcademicDepartment[]>(res, {
    statusCode: 200,
    success: true,
    message: "Successfully get Department",
    meta: result.meta,
    data: result.data,
  });
});

export const getDepartmentById = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await academicDepartmentService.getDepartmentByIdService(id);
    sendResponse<IAcademicDepartment>(res, {
      statusCode: 200,
      success: true,
      message: "Successfully get Department",
      data: result,
    });
  },
);

export const updateDepartmentById = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await academicDepartmentService.updateDepartmentByIdService(
      id,
      req.body,
    );
    sendResponse<IAcademicDepartment>(res, {
      statusCode: 200,
      success: true,
      message: "Successfully updated Department",
      data: result,
    });
  },
);

export const deleteDepartmentById = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await academicDepartmentService.deleteDepartmentByIdService(
      id,
    );
    sendResponse<IAcademicDepartment>(res, {
      statusCode: 200,
      success: true,
      message: "Successfully deleted semester",
      data: result,
    });
  },
);
