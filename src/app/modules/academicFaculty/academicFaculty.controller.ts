import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import * as academicFacultyService from "./academicFaculty.service";
import sendResponse from "../../../shared/sendResponse";
import { IAcademicFaculty } from "./academicFaculty.interface";
import {
  Pagination,
  Search,
} from "../../../interfaces/databaseQuery.interface";
import pick from "../../../shared/pick";
import { academicFacultyFilterableField } from "./academicFaculty.constant";
import { paginationField } from "../../constant/pagination";

export const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const result = await academicFacultyService.createFacultyService(req.body);

  sendResponse<IAcademicFaculty>(res, {
    statusCode: 201,
    success: true,
    message: "Successfully created academic faculty",
    data: result,
  });
});

export const getFaculty = catchAsync(async (req: Request, res: Response) => {
  const searchTerm: Search = pick(req.query, academicFacultyFilterableField);
  const paginationOptions: Pagination = pick(req.query, paginationField);

  const result = await academicFacultyService.getFacultyService(
    searchTerm,
    paginationOptions,
  );

  sendResponse<IAcademicFaculty[]>(res, {
    statusCode: 200,
    success: true,
    message: "Successfully get faculty",
    meta: result.meta,
    data: result.data,
  });
});

export const getFacultyById = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await academicFacultyService.getFacultyByIdService(id);
    sendResponse<IAcademicFaculty>(res, {
      statusCode: 200,
      success: true,
      message: "Successfully get faculty",
      data: result,
    });
  },
);

export const updateFacultyById = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await academicFacultyService.updateFacultyByIdService(
      id,
      req.body,
    );
    sendResponse<IAcademicFaculty>(res, {
      statusCode: 200,
      success: true,
      message: "Successfully updated faculty",
      data: result,
    });
  },
);

export const deleteFacultyById = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await academicFacultyService.deleteFacultyByIdService(id);
    sendResponse<IAcademicFaculty>(res, {
      statusCode: 200,
      success: true,
      message: "Successfully deleted semester",
      data: result,
    });
  },
);
