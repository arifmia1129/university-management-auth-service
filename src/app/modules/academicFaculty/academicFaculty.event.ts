import { RedisClient } from "../../../shared/redis";
import {
  EVENT_CREATED_ACADEMIC_FACULTY,
  EVENT_DELETED_ACADEMIC_FACULTY,
  EVENT_UPDATED_ACADEMIC_FACULTY,
} from "./academicFaculty.constant";
import {
  createFacultyFromEventService,
  deleteFacultyByEventService,
  updateFacultyByEventService,
} from "./academicFaculty.service";

const initAcademicFacultyEvent = () => {
  RedisClient.subscribe(
    EVENT_CREATED_ACADEMIC_FACULTY,
    async (event: string) => {
      const data = JSON.parse(event);
      await createFacultyFromEventService(data);
    },
  );
  RedisClient.subscribe(
    EVENT_UPDATED_ACADEMIC_FACULTY,
    async (event: string) => {
      const data = JSON.parse(event);
      await updateFacultyByEventService(data);
    },
  );
  RedisClient.subscribe(
    EVENT_DELETED_ACADEMIC_FACULTY,
    async (event: string) => {
      const data = JSON.parse(event);
      await deleteFacultyByEventService(data);
    },
  );
};

export default initAcademicFacultyEvent;
