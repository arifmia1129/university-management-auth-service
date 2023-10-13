import initAcademicDepartmentEvents from "../modules/academicDepartment/academicDepartment.event";
import initAcademicFacultyEvent from "../modules/academicFaculty/academicFaculty.event";
import initAcademicSemesterEvent from "../modules/academicSemester/academicSemester.event";
import initFacultyEvent from "../modules/faculty/faculty.event";

const subscribeEvents = () => {
  initAcademicSemesterEvent();
  initAcademicDepartmentEvents();
  initAcademicFacultyEvent();
  initFacultyEvent();
};

export default subscribeEvents;
