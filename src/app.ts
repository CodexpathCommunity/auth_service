require("dotenv").config();
import express from "express";
import config from "config";
import connectDb from "./utils/connectDb";

const app = express();

const port = config.get("port");

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  connectDb();
});
