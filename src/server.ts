import mongoose from "mongoose";
import app from "./app";
import config from "./config";
import { errorLogger, infoLogger } from "./shared/logger";
import { Server } from "http";
import { RedisClient } from "./shared/redis";
import subscribeEvents from "./app/events";

let server: Server;

async function connectToDatabase() {
  try {
    await mongoose.connect(config.db_url as string);
    infoLogger.info("DB Connected!");
  } catch (error) {
    errorLogger.error("Failed to connect to the database", error);
    process.exit(1);
  }
}

async function startServer() {
  try {
    server = app.listen(config.port, () => {
      infoLogger.info(`Application is listening on port ${config.port}`);
    });
  } catch (error) {
    errorLogger.error("Failed to start the server", error);
    process.exit(1);
  }
}

async function main() {
  await RedisClient.connect();
  subscribeEvents();
  connectToDatabase();
  startServer();
}

main();

process.on("SIGTERM", () => {
  infoLogger.info("SIGTERM received");
  if (server) {
    server.close(() => {
      process.exit(0); // Exit with code 0 to indicate a successful shutdown
    });
  }
});
