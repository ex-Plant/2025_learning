//add "type": "module" to package json for imports to work

import http from "node:http";
import formidable, { errors as formidableErrors } from "formidable";
import fs from "fs.js";

const formHtml = `
<html lang="en">
  <head>
    <title>MyForm</title>
  </head>
  <body>
<!--  FILE UPLOAD WILL NOT WORK WITHOUT enctype='multipart/form-data'  -->
    <form action="/upload" method='post' enctype='multipart/form-data'> 
    <div>
    <label for='name'>name</label>
    <input type='text' name='name'>
    
</div>
      <div>File: <input type="file" name="file1" /></div>
      <button type='submit'>send</button>
    </form>
  </body>
</html
`;

// FORMIDABLE IS DOING THE CHUNKING HERE

const server = http.createServer(async (req, res) => {
  if (req.url === "/upload" && req.method === "POST") {
    const form = formidable({});
    let fields;
    let files;
    try {
      [fields, files] = await form.parse(req);
      const tempPath = files.file1[0].filepath;

      // creating new directory
      const uploadDir = `./uploads`;

      await fs.mkdir(uploadDir, { recursive: true }, (err) => {
        console.error("Error parsing the form:", err);
        if (!res.headersSent) {
          res.writeHead(err.httpCode || 400, { "Content-Type": "text/plain" });
          res.end(String(err));
          return;
        }
        console.log(`making directory...`);
      });

      const newPath = uploadDir + "/" + files.file1[0].originalFilename;

      console.log(newPath);

      fs.rename(tempPath, newPath, (err) => {
        if (err) {
          console.error("Error renaming file:", err);
          if (!res.headersSent) {
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end(String(err));
          }
        }
      });
    } catch (err) {
      // example to check for a very specific error
      console.error(err);
      res.writeHead(err.httpCode || 400, { "Content-Type": "text/plain" });
      res.end(String(err));
      return;
    }

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ fields, files }, null, 2));
  }

  if (!res.headersSent) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.end(formHtml);
  }
});

server.listen(8000, () => {
  console.log("Server listening on http://localhost:8000/ ...");
});
