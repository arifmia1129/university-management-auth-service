import { RedisClient } from "../../../shared/redis";
import { EVENT_CREATED_ACADEMIC_SEMESTER } from "./academicSemester.constant";

const initAcademicSemesterEvent = async () => {
  RedisClient.subscribe(
    EVENT_CREATED_ACADEMIC_SEMESTER,
    async (event: string) => {
      const data = JSON.parse(event);
      console.log(data);
    },
  );
};

export default initAcademicSemesterEvent;
