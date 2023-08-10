import { IAcademicSemester } from "../academicSemester/academicSemester.interface";
import User from "./user.model";

// generate student id
const getLastStudentId = async (): Promise<string | null> => {
  const lastId = await User.findOne({ role: "student" }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();

  return lastId?.id ? lastId.id.substring(4) : "0";
};

export const generateStudentId = async (
  academicSemester: IAcademicSemester,
): Promise<string> => {
  const lastId: string = (await getLastStudentId()) as string;
  const currentId = (Number(lastId) + 1).toString().padStart(5, "0");

  return `${academicSemester.year.substring(2)}${
    academicSemester.code
  }${currentId}`;
};

// generate faculty id
const getLastFacultyId = async (): Promise<string | null> => {
  const lastId = await User.findOne({ role: "faculty" }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();

  return lastId?.id ? lastId.id.substring(2) : "0";
};

export const generateFacultyId = async (): Promise<string> => {
  const lastId: string = (await getLastFacultyId()) as string;
  const currentId = (Number(lastId) + 1).toString().padStart(5, "0");

  return `F-${currentId}`;
};

// generate admin id
const getLastAdminId = async (): Promise<string | null> => {
  const lastId = await User.findOne({ role: "admin" }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();

  return lastId?.id ? lastId.id.substring(2) : "0";
};

export const generateAdminId = async (): Promise<string> => {
  const lastId: string = (await getLastAdminId()) as string;
  const currentId = (Number(lastId) + 1).toString().padStart(5, "0");

  return `A-${currentId}`;
};
