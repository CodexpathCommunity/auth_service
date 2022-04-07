require("dotenv").config();
import express from "express";
import config from "config";
import connectDb from "./utils/connectDb";
import log from "./utils/logger";
import router from "./routes";
import deserializeUser from "./middlewares/deserializeUser";

const app = express();

app.use(express.json());

app.use(deserializeUser);

app.use("/api/v1", router);

const port = config.get("port");

app.listen(port, () => {
  log.info(`Server running at http://localhost:${port}`);

  connectDb();
});
