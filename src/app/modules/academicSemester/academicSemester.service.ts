import ApiError from "../../../errors/ApiError";
import httpStatus from "../../../shared/httpStatus";
import { academicSemesterTitleWithCode } from "./academicSemester.constant";
import { IAcademicSemester } from "./academicSemester.interface";
import AcademicSemester from "./academicSemester.model";

export const createSemesterService = async (
  semester: IAcademicSemester,
): Promise<IAcademicSemester | null> => {
  if (academicSemesterTitleWithCode[semester.title] !== semester.code) {
    throw new ApiError("Invalid semester code", httpStatus.BAD_REQUEST);
  }

  const res = await AcademicSemester.create(semester);
  return res;
};
