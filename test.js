function logToServer(msg) {
  fetch("/log", {
    method: "POST",
    body: JSON.stringify(msg),
  });
}

logToServer(`User logged in`);

const queue = [];
queue.push(() => logToServer("deferred log"));

// later
for (const cmd of queue) cmd();
