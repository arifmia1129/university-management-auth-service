import { IAcademicSemester } from "./academicSemester.interface";
import AcademicSemester from "./academicSemester.model";

export const createSemesterService = async (
  semester: IAcademicSemester,
): Promise<IAcademicSemester | null> => {
  const res = await AcademicSemester.create(semester);
  return res;
};
