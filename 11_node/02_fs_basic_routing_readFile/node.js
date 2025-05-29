const http = require("http.js");
const fs = require("fs.js");
const url = require("url.js");

const server = http.createServer((req, res) => {
  console.log("server started");
  res.writeHead(200, {
    "Content-type": "text/html",
  });
  console.log(req.url);

  // const urlPath = "." + url.parse(req.url, true).pathname;
  console.log(req.url);

  // to read index.html go to localhost:8000/index.html
  // to read hi-mark.html go to localhost:8000/hi-marc.html
  fs.readFile("." + req.url, (err, data) => {
    if (err) {
      res.writeHead(404, {
        "Content-type": "text/html",
      });
      return res.end("not found");
    }
    res.writeHead(200, {
      "Content-type": "text/html",
    });
    res.write(data);
    res.end();
  });
});

server.listen(8000);
