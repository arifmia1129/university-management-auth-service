import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import {
  Pagination,
  Filter,
} from "../../../interfaces/databaseQuery.interface";
import pick from "../../../shared/pick";
import { paginationField } from "../../constant/pagination";
import * as adminService from "./admin.service";
import { adminFilterableField } from "./admin.constant";
import { IAdmin } from "./admin.interface";

export const getAdmin = catchAsync(async (req: Request, res: Response) => {
  const filterData: Filter = pick(req.query, adminFilterableField);
  const paginationOptions: Pagination = pick(req.query, paginationField);

  const result = await adminService.getAdminService(
    filterData,
    paginationOptions,
  );

  sendResponse<IAdmin[]>(res, {
    statusCode: 200,
    success: true,
    message: "Successfully get Admin",
    meta: result.meta,
    data: result.data,
  });
});

export const getAdminById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await adminService.getAdminByIdService(id);
  sendResponse<IAdmin>(res, {
    statusCode: 200,
    success: true,
    message: "Successfully get Admin by id",
    data: result,
  });
});

export const updateAdminById = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await adminService.updateAdminByIdService(id, req.body);
    sendResponse<IAdmin>(res, {
      statusCode: 200,
      success: true,
      message: "Successfully updated Admin",
      data: result,
    });
  },
);

export const deleteAdminById = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await adminService.deleteAdminByIdService(id);
    sendResponse<IAdmin>(res, {
      statusCode: 200,
      success: true,
      message: "Successfully deleted Admin",
      data: result,
    });
  },
);
