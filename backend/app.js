import express from "express";

const app = express();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.status(200).end("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
