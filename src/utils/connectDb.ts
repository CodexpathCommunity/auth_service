import mongoose from "mongoose";
import config from "config";

async function connectDb() {
  const dbUrl = config.get<string>("dbUrl");

  try {
    await mongoose.connect(dbUrl);
  } catch (error) {
    process.exit(1);
  }
}

export default connectDb;
