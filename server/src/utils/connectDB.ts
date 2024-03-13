import mongoose from "mongoose";
import logger from "./logger";
import { mongoUri } from "./config";

export async function connectDb() {
  try {
    // Keep trying to connect as long as the app is disconnected from mongoDB
    const db = await mongoose.connect(mongoUri);
    logger.info(`Connected to DB, ${mongoUri}`, db.connection.readyState);
  } catch (e) {
    logger.error("Error connecting to DB", e);
    process.exit(1);
  }
}
