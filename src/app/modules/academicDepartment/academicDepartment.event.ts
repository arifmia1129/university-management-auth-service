import { RedisClient } from "../../../shared/redis";
import {
  EVENT_CREATED_ACADEMIC_DEPARTMENT,
  EVENT_DELETED_ACADEMIC_DEPARTMENT,
  EVENT_UPDATED_ACADEMIC_DEPARTMENT,
} from "./academicDepartment.constant";
import {
  createDepartmentFromEventService,
  deleteDepartmentByEventService,
  updateDepartmentByEventService,
} from "./academicDepartment.service";

const initAcademicDepartmentEvents = async () => {
  RedisClient.subscribe(
    EVENT_CREATED_ACADEMIC_DEPARTMENT,
    async (event: string) => {
      const data = JSON.parse(event);
      await createDepartmentFromEventService(data);
    },
  );
  RedisClient.subscribe(
    EVENT_UPDATED_ACADEMIC_DEPARTMENT,
    async (event: string) => {
      const data = JSON.parse(event);
      await updateDepartmentByEventService(data);
    },
  );
  RedisClient.subscribe(
    EVENT_DELETED_ACADEMIC_DEPARTMENT,
    async (event: string) => {
      const data = JSON.parse(event);
      //   console.log(data);
      await deleteDepartmentByEventService(data);
    },
  );
};

export default initAcademicDepartmentEvents;
