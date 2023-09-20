import { RedisClient } from "../../../shared/redis";
import { EVENT_CREATED_ACADEMIC_SEMESTER } from "../academicSemester/academicSemester.constant";
import { createDepartmentFromEventService } from "./academicDepartment.service";

const initAcademicDepartmentEvents = async () => {
  RedisClient.subscribe(
    EVENT_CREATED_ACADEMIC_SEMESTER,
    async (event: string) => {
      const data = JSON.parse(event);
      await createDepartmentFromEventService(data);
    },
  );
};

export default initAcademicDepartmentEvents;
