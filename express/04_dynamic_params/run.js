const express = require("express");

const app = express();

app.get(`/`, (req, res) => {
  res.status(200).send(`👌`);
});

// DYNAMIC PATHS
app.get(`/:article`, (req, res) => {
  const { article } = req.params;

  res.status(200).send(`
  <div>hello world from dynamic path</div>
  <div>${article}</div>
`);
});

// http://localhost:8000/news/2024-121-20
// hello from news/2024-121-20
app.get(`/:news/:year-:month-:day`, (req, res) => {
  console.log(req.params);
  res.status(200).send(`
  hello! Selected day is ${req.params.day}
  Selected month is ${req.params.month}
  Selected year is ${req.params.year}
  `);
});

//http://localhost:8000/test/123/1230
// hello from snake_helpers/123/1230
app.get(`/:url(*)`, (req, res) => {
  res.status(200).send(`hello from ${req.params.url}`);
});

// Catch-all 404 handler
// in my current case this will never be executed because all cases already have
// some responses
app.use((req, res) => {
  res.status(404).send("404 Not Found");
});

const port = 8000;

app.listen(port, () => {
  console.log(`Listening at: http://localhost:${port}`);
});
