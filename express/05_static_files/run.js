const express = require("express");

const app = express();

app.use("/public", express.static("../public"));

app.get("/", (req, res) => {
  res.status(200).send(`Hello world!`);
});

app.listen(8080);
