import { HydratedDocument, Model } from "mongoose";

export type AcademicSemesterMonth =
  | "January"
  | "February"
  | "March"
  | "April"
  | "May"
  | "June"
  | "July"
  | "August"
  | "September"
  | "October"
  | "November"
  | "December";

export type AcademicSemesterTitle = "Autumn" | "Summer" | "Fall";
export type AcademicSemesterCode = "01" | "02" | "03";

export type IAcademicSemester = {
  title: AcademicSemesterTitle;
  year: number;
  code: AcademicSemesterCode;
  startMonth: AcademicSemesterMonth;
  endMonth: AcademicSemesterMonth;
};

export type IAcademicSemesterMethods = {
  fullName(): string;
};

export type AcademicSemesterModel = {
  createWithFullName(): Promise<
    HydratedDocument<IAcademicSemester, IAcademicSemesterMethods>
  >;
  // name: string,
} & Model<IAcademicSemester, object, IAcademicSemesterMethods>;
