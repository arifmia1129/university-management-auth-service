import { RedisClient } from "../../../shared/redis";
import {
  EVENT_CREATED_ACADEMIC_SEMESTER,
  EVENT_DELETED_ACADEMIC_SEMESTER,
  EVENT_UPDATED_ACADEMIC_SEMESTER,
} from "./academicSemester.constant";
import {
  createSemesterFromEventService,
  deleteSemesterByEventService,
  updateSemesterByEventService,
} from "./academicSemester.service";

const initAcademicSemesterEvent = async () => {
  RedisClient.subscribe(
    EVENT_CREATED_ACADEMIC_SEMESTER,
    async (event: string) => {
      const data = JSON.parse(event);

      await createSemesterFromEventService(data);
    },
  );
  RedisClient.subscribe(
    EVENT_UPDATED_ACADEMIC_SEMESTER,
    async (event: string) => {
      const data = JSON.parse(event);

      await updateSemesterByEventService(data);
    },
  );
  RedisClient.subscribe(
    EVENT_DELETED_ACADEMIC_SEMESTER,
    async (event: string) => {
      const data = JSON.parse(event);

      await deleteSemesterByEventService(data);
    },
  );
};

export default initAcademicSemesterEvent;
