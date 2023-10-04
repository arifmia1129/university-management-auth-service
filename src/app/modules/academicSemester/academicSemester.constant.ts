import {
  AcademicSemesterCode,
  AcademicSemesterMonth,
  AcademicSemesterTitle,
} from "./academicSemester.interface";

export const academicSemesterTitle: AcademicSemesterTitle[] = [
  "Autumn",
  "Summer",
  "Fall",
];

export const academicSemesterCode: AcademicSemesterCode[] = ["01", "02", "03"];

export const academicSemesterMonth: AcademicSemesterMonth[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const academicSemesterTitleWithCode: { [key: string]: string } = {
  Autumn: "01",
  Summer: "02",
  Fall: "03",
};

export const academicSemesterSearchableField = ["title", "code", "year"];

export const academicSemesterFilterableField = [
  "searchTerm",
  "title",
  "code",
  "year",
  "syncId",
];

export const EVENT_CREATED_ACADEMIC_SEMESTER = "createdAcademicSemester";
export const EVENT_UPDATED_ACADEMIC_SEMESTER = "updatedAcademicSemester";
export const EVENT_DELETED_ACADEMIC_SEMESTER = "deletedAcademicSemester";
