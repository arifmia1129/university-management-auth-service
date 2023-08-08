import { Schema, model } from "mongoose";
import {
  AcademicFacultyModel,
  IAcademicFaculty,
  IAcademicFacultyMethods,
} from "./academicFaculty.interface";

const academicFacultySchema = new Schema<
  IAcademicFaculty,
  AcademicFacultyModel,
  IAcademicFacultyMethods
>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

const AcademicFaculty = model<IAcademicFaculty, AcademicFacultyModel>(
  "AcademicFaculty",
  academicFacultySchema,
);

export default AcademicFaculty;
