const express = require("express");

const app = express();

const MIDDLEWARE = `
Middleware in the context of Express.js refers to functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle. These functions can execute code, modify the request and response objects, end the request-response cycle, and call the next middleware function.

In the following example:
1. myMiddleware is a middleware function that logs a message to the console.
2. app.use(myMiddleware) adds the middleware to the application.
3. When a request is made to the root URL (/), the middleware function is executed, logging the message before passing control to the route handler that sends the "Hello World" response.
4. Middleware can be used for various tasks such as logging, authentication, parsing request bodies, and more.
`;

// app.use(myMiddleware);

const EXECUTING_MIDDLEWARE = `
When you define middleware functions in Express.js, you don't explicitly pass arguments to them; Express.js handles that for you!
When a request is made to /user/:id, Express.js automatically invokes the middleware functions in the order they are defined. Each middleware function receives three arguments: req (the request object), res (the response object), and next (a function to pass control to the next middleware).

In summary:

Middleware functions are executed sequentially.
req, res, and next are automatically passed by Express.js.
Calling next() passes control to the next middleware function.
Calling next('route') skips the remaining middleware functions and passes control to the next route handler.
`;

function myMiddleware(req, res, next) {
  console.log(`Middleware is running`);

  // here we are modifying the  request by adding additional field to req obj
  req.requestTime = Date.now();
  // without this next() server will finish after console.log()
  // we go to next middleware
  next();
}

console.log(__dirname);

// you can decide what you want to do based on the current path
function middleware1(req, res, next) {
  if (req.params.id === "0") {
    next("route"); // Skip to the next route handler if id is "0"
  } else {
    next(); // Continue to the next middleware function
  }
}

function middleware2(req, res, next) {
  const timeStamp = req.requestTime;
  res.send(String(timeStamp)); // Response for non-zero id
}

// this will be executed on every route
app.use(myMiddleware);

// this will be executed only on /tests
app.use(`/tests`, myMiddleware);

app.get(`/user/:id`, middleware1, middleware2);

// Separate route handler for `/user/0`
app.get("/user/0", (req, res) => {
  res.send("Special handler for user with id 0");
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(8080);
