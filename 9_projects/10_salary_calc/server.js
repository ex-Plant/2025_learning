const http = require(`http`);
const fs = require("fs").promises;
const path = require(`path`);
const cssFile =
  "/Users/konradantonik/WebstormProjects/nauka_2024/src/output.css";

const server = http.createServer(async (req, res) => {
  console.log(`server initiated 👌`);

  try {
    // load javascript
    if (req.url === "/run.js") {
      const data = await fs.readFile(path.join(process.cwd(), "run.js"));
      res.status = 200;
      res.setHeader("Content-type", "application/javascript");
      res.write(data);
      res.end();
      return;
    }

    if (req.url === "output.css") {
      // load css
      const data = await fs.readFile(path.join(cssFile));
      res.status = 200;
      res.setHeader("Content-type", "text/css");
      res.write(data);
      res.end();
      return;
    }

    if (req.url === "/") {
      // load html
      res.setHeader("Content-type", "text/html");
      const data = await fs.readFile(path.join(process.cwd(), `index.html`));
      res.status = 200;
      res.write(data);
      res.end();
      return;
    } else {
      res.status = 404;
      res.write(`not found!`);
    }
  } catch (error) {
    console.log(`An error occured: `, error);
  }
});
const port = 8080;

server.listen(port, () => console.log(`Listening on port:`, port));
