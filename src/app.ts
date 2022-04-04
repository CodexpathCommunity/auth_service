require("dotenv").config();
import express from "express";
import config from "config";
import connectDb from "./utils/connectDb";
import log from "./utils/logger";
import router from "./routes";

const app = express();

app.use(express.json());

app.use("/api/v1", router);

const port = config.get("port");

app.listen(port, () => {
  log.info(`Server running at http://localhost:${port}`);

  connectDb();
});
