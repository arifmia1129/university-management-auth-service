import { Schema, model } from "mongoose";
import {
  AcademicDepartmentModel,
  IAcademicDepartment,
  IAcademicDepartmentMethods,
} from "./academicDepartment.interface";

const academicDepartmentSchema = new Schema<
  IAcademicDepartment,
  AcademicDepartmentModel,
  IAcademicDepartmentMethods
>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: "AcademicFaculty",
      required: true,
    },
    syncId: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

const AcademicDepartment = model<IAcademicDepartment, AcademicDepartmentModel>(
  "AcademicDepartment",
  academicDepartmentSchema,
);

export default AcademicDepartment;
