const http = require("http.js");
const fs = require("fs.js");
const { parse } = require("querystring.js");

const server = http.createServer((req, res) => {
  res.setHeader("Content-type", "text/html");

  if (req.url === "/") {
    res.write(`<a href='/index.html'> go to a form</a>`);
    res.statusCode = 200;
    res.end();
    // first we need to read the html file containing the form
  } else if (req.url === "/index.html" && req.method === "GET") {
    fs.readFile("./index.html", (err, data) => {
      if (err) {
        res.write("something went wrong");
        res.statusCode = 400;
        res.end();
        return;
      }
      res.statusCode = 200;
      res.end(data);
    });

    // here we are actually reading form data
  } else if (req.url === "/index.html" && req.method === "POST") {
    let body = "";

    // data might be in chunks!
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    // after reading data we log them and we write another response
    req.on("end", (err) => {
      if (err) {
        res.write("something went wrong");
        res.statusCode = 400;
        res.end();
        return;
      }
      const parsedData = parse(body);
      console.log(JSON.stringify(parsedData));
      res.statusCode = 200;
      res.write("Form data received");
      res.end();
    });
  } else {
    res.write("not found");
    res.statusCode = 404;
    res.end();
  }
});

server.listen(8000, () => {
  console.log("listening on", "http://localhost:8000");
});
