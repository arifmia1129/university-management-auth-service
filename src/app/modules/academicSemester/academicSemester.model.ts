import { Schema, model } from "mongoose";
import {
  AcademicSemesterModel,
  IAcademicSemester,
  IAcademicSemesterMethods,
} from "./academicSemester.interface";
import {
  academicSemesterCode,
  academicSemesterMonth,
  academicSemesterTitle,
} from "./academicSemester.constant";
import ApiError from "../../../errors/ApiError";
import httpStatus from "../../../shared/httpStatus";

const academicSemesterSchema = new Schema<
  IAcademicSemester,
  AcademicSemesterModel,
  IAcademicSemesterMethods
>(
  {
    title: {
      type: String,
      required: true,
      enum: academicSemesterTitle,
    },
    year: {
      type: Number,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: academicSemesterCode,
    },
    startMonth: {
      type: String,
      required: true,
      enum: academicSemesterMonth,
    },
    endMonth: {
      type: String,
      required: true,
      enum: academicSemesterMonth,
    },
  },
  {
    timestamps: true,
  },
);

academicSemesterSchema.pre("save", async function (next) {
  const isExist = await AcademicSemester.findOne({
    title: this.title,
    year: this.year,
  });

  if (isExist) {
    throw new ApiError(
      `This ${this.title} semester is already exist in this ${this.year} year`,
      httpStatus.CONFLICT,
    );
  } else {
    next();
  }
});

const AcademicSemester = model<IAcademicSemester, AcademicSemesterModel>(
  "AcademicSemester",
  academicSemesterSchema,
);

export default AcademicSemester;
