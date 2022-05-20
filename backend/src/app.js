import express from "express";

import env from "./config/env.js";

const app = express();
const { PORT } = env;

app.get("/", (req, res) => {
  res.status(200).end("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
