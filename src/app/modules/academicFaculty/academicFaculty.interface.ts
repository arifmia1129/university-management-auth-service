import { HydratedDocument, Model } from "mongoose";

export type IAcademicFaculty = {
  title: string;
  syncId: string;
};

export type IAcademicFacultyMethods = {
  fullName(): string;
};

export type AcademicFacultyModel = {
  createWithFullName(): Promise<
    HydratedDocument<IAcademicFaculty, IAcademicFacultyMethods>
  >;
  // name: string,
} & Model<IAcademicFaculty, object, IAcademicFacultyMethods>;

export type IAcademicFacultyFromEvent = {
  title: string;
  id: string;
};
