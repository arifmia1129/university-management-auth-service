import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import {
  Pagination,
  Filter,
} from "../../../interfaces/databaseQuery.interface";
import pick from "../../../shared/pick";
import * as managementDepartmentService from "./managementDepartment.service";
import { IManagementDepartment } from "./managementDepartment.interface";
import { managementDepartmentFilterableField } from "./managementDepartment.constant";
import { paginationField } from "../../constant/pagination";

export const createManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await managementDepartmentService.createManagementDepartmentService(
        req.body,
      );

    sendResponse<IManagementDepartment>(res, {
      statusCode: 201,
      success: true,
      message: "Successfully created Management Department",
      data: result,
    });
  },
);

export const getManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const filterData: Filter = pick(
      req.query,
      managementDepartmentFilterableField,
    );
    const paginationOptions: Pagination = pick(req.query, paginationField);

    const result =
      await managementDepartmentService.getManagementDepartmentService(
        filterData,
        paginationOptions,
      );

    sendResponse<IManagementDepartment[]>(res, {
      statusCode: 200,
      success: true,
      message: "Successfully get Management Department",
      meta: result.meta,
      data: result.data,
    });
  },
);

export const getManagementDepartmentById = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result =
      await managementDepartmentService.getManagementDepartmentByIdService(id);
    sendResponse<IManagementDepartment>(res, {
      statusCode: 200,
      success: true,
      message: "Successfully get Management Department",
      data: result,
    });
  },
);

export const updateManagementDepartmentById = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result =
      await managementDepartmentService.updateManagementDepartmentByIdService(
        id,
        req.body,
      );
    sendResponse<IManagementDepartment>(res, {
      statusCode: 200,
      success: true,
      message: "Successfully updated Management Department",
      data: result,
    });
  },
);

export const deleteManagementDepartmentById = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result =
      await managementDepartmentService.deleteManagementDepartmentByIdService(
        id,
      );
    sendResponse<IManagementDepartment>(res, {
      statusCode: 200,
      success: true,
      message: "Successfully deleted Management Department",
      data: result,
    });
  },
);
