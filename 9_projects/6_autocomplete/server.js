const http = require(`http`);
const fs = require("fs").promises;
const path = require(`path`);
const querystring = require("querystring");

console.log(`server started`);

const cwd = process.cwd();
const pageFile = path.join(cwd, "index.html");
const jsFile = path.join(cwd, "code.js");
const cssFile =
  "/Users/konradantonik/WebstormProjects/nauka_2024/src/output.css";

async function serveFile(res, filePath, contentType) {
  try {
    const data = await fs.readFile(filePath);
    res.writeHead(200, { "Content-type": contentType });
    res.write(data);
    res.end();
  } catch (e) {
    console.log(e);
    res.statusCode = 500;
    res.setHeader(`Content-type`, "text/plain");
    res.end(`Something went wrong`);
  }
}

const server = http.createServer(async (req, res) => {
  switch (req.url) {
    case "/":
      // if (req.method === "POST") {
      //   let inputData = "";
      //
      //   req.on("data", (chunk) => {
      //     inputData += chunk.toString();
      //   });
      //
      //   req.on("end", (err) => {
      //     if (err) {
      //       console.log(`something went wrong`);
      //       return;
      //     }
      //     const parsedData = querystring.parse(inputData);
      //     console.log(parsedData.search);
      //   });
      // }

      await serveFile(res, pageFile, "text/html");
      break;

    case "/code.js":
      await serveFile(res, jsFile, "application/javascript");
      break;

    case "/output.css":
      await serveFile(res, cssFile, "text/css");
      break;
    default:
      res.writeHead(404, {
        "Content-type": "text/plain",
      });
      res.write("not found");
      res.end();
  }
});

const port = 8080;

server.listen(port, () => {
  console.log(`Listening on: http://localhost:${port}`);
});
