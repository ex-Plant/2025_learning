const http = require("http.js");
const url = require("url.js");

const server = http.createServer((req, res) => {
  res.writeHead(200, {
    "Content-type": "text/html",
  });

  const test_url = url.parse(req.url, true);
  // test_url Url {
  //   protocol: null,
  //     slashes: null,
  //     auth: null,
  //     host: null,
  //     port: null,
  //     hostname: null,
  //     hash: null,
  //     search: null,
  //     query: [Object: null prototype] {},
  //   pathname: '/favicon.ico',
  //     path: '/favicon.ico',
  //     href: '/favicon.ico'
  // }

  console.log(test_url.query); // { test: '123', konrad: '23', konrad2: '' }
  console.log(`search:`, test_url.search);
  // search: ?test=123&konrad=23&konrad2

  res.write(`wtf is that`);
  res.write(`<div style='background-color: red'>asdfas</div>`);

  res.end(`this is also here`);
});

server.listen(8001);
