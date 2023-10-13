import { RedisClient } from "../../../shared/redis";
import { EVENT_FACULTY_SYNC_ID_UPDATE } from "./faculty.constant";
import { updateFacultySyncIdService } from "./faculty.service";

const initFacultyEvent = () => {
  RedisClient.subscribe(EVENT_FACULTY_SYNC_ID_UPDATE, async (event: string) => {
    const data = JSON.parse(event);
    updateFacultySyncIdService(data);
  });
};

export default initFacultyEvent;
