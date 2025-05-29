const http = require("http.js");
const url = require("url.js");

const NODE = `
1. Node is a runtime environment that allows executing js on the server, outside web browser. 
2. It is built on V8 engine, the same that powers Google Chrome. 
3. ASYNCHRONOUS and EVENT DRIVEN non blocking I/O model.
4. Comes with NPM: the package manager that comes with Node.js, used for installing, updating, and managing JavaScript packages.
5. Cross platform - will run on Linux, Windows, and OS`;

// http
//   .createServer(function (req, res) {
//     res.writeHead(200, {
//       "Content-type": "text/html",
//     });
//     res.end(`Hello World`);
//   })
//   .listen(8080);
//
// http
//   .createServer((req, res) => {
//     console.log(res);
//     console.log(`hi mark`);
//     res.writeHead(200, {
//       "Content-type": "application/json",
//     });
//     res.end(`test test test`);
//   })
//   .listen(8079);
//
const hostname = "127.0.0.1";
const port = 3000;

// this is the same as above
const server = http.createServer((req, res) => {
  let parsedUrl = url.parse(req.url);
  console.log(req.url);

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");

  res.end(JSON.stringify(parsedUrl));

  return {
    req,
    res,
  };
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

const http = require(`http`);

const server = http.createServer((req, res) => {
  res.writeHead(200, {
    "Content-type": `application/json`,
  });
  res.end(`testttt`);
});

server.listen(8080);

const server2 = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-type", "text/plain");
  res.end(`something `);
});

server2.listen(8001);
