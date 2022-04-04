require("dotenv").config();
import express from "express";
import config from "config";
import connectDb from "./utils/connectDb";
import log from "./utils/logger";

const app = express();

const port = config.get("port");

app.listen(port, () => {
  log.info(`Server running at http://localhost:${port}`);

  connectDb();
});
