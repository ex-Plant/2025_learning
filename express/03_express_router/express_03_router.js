const express = require("express");

const app = express();

const testRouter = require("./test_router.js");
const testRouter2 = require("./test_router_2.js");
const testRouter3 = require("./test_router_3.js");

app.get(`/`, (req, res) => {
  res.status(200).send(`hello world again`);
});

app.use("/snake_helpers", testRouter);
app.use("/test2", testRouter2);
app.use("/test3", testRouter3);

const port = 8000;
app.listen(port, () => {
  console.log(`listening: http:localhost:${port}`);
});
