import mongoose from "mongoose";
import config from "config";
import log from "./logger";

async function connectDb() {
  const dbUrl = config.get<string>("dbUrl");

  try {
    await mongoose.connect(dbUrl);
    log.info(`Connected to DB`);
  } catch (error) {
    process.exit(1);
  }
}

export default connectDb;
