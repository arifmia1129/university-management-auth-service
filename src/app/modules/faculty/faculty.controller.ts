import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import {
  Pagination,
  Filter,
} from "../../../interfaces/databaseQuery.interface";
import pick from "../../../shared/pick";
import { paginationField } from "../../constant/pagination";
import { facultyFilterableField } from "./faculty.constant";
import * as facultyService from "./faculty.service";
import { IFaculty } from "./faculty.interface";

export const getFaculty = catchAsync(async (req: Request, res: Response) => {
  const filterData: Filter = pick(req.query, facultyFilterableField);
  const paginationOptions: Pagination = pick(req.query, paginationField);

  const result = await facultyService.getFacultyService(
    filterData,
    paginationOptions,
  );

  sendResponse<IFaculty[]>(res, {
    statusCode: 200,
    success: true,
    message: "Successfully get Faculty",
    meta: result.meta,
    data: result.data,
  });
});

export const getFacultyById = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await facultyService.getFacultyByIdService(id);
    sendResponse<IFaculty>(res, {
      statusCode: 200,
      success: true,
      message: "Successfully get Faculty by id",
      data: result,
    });
  },
);

export const updateFacultyById = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await facultyService.updateFacultyByIdService(id, req.body);
    sendResponse<IFaculty>(res, {
      statusCode: 200,
      success: true,
      message: "Successfully updated Faculty",
      data: result,
    });
  },
);

export const deleteFacultyById = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await facultyService.deleteFacultyByIdService(id);
    sendResponse<IFaculty>(res, {
      statusCode: 200,
      success: true,
      message: "Successfully deleted Faculty",
      data: result,
    });
  },
);
