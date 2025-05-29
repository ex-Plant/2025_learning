import fs from "fs.js";
import path from "path.js";
console.log(`program started`);

const ASYNC_SYNC_METHODS = `
In modern applications, asynchronous methods are generally preferred over synchronous methods, especially in environments like Node.js. Here’s why:

Non-blocking Behavior: Asynchronous methods do not block the event loop, allowing other operations to continue executing. This is crucial in server applications where blocking the event loop can degrade performance and responsiveness.
Scalability: Asynchronous methods help in building scalable applications by efficiently managing I/O-bound operations, such as file system access, network requests, and database interactions.
Improved User Experience: In front-end applications, asynchronous operations (like those using async/await, Promises, or callbacks) ensure that the UI remains responsive, enhancing the user experience.

`;

const currentDir = process.cwd();
const CWD = `current working directory`;

console.log(currentDir);
// console.log(__dirname); // in commonjs

// create new catalogue
function createNewDir(path) {
  fs.mkdir(path, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`dir created: `, path);
  });
}

// synchronous CHECK IF DIRECTORY EXISTS
function createDirIfDoesNotExist(dirPath) {
  if (fs.existsSync(dirPath)) {
    console.log(`directory already exists!`);
  } else {
    createNewDir(dirPath);
  }
}

// alternative to existsSync - this works the other way around, error means
// there is no directory
function createDirAccessCheck(dirPath) {
  fs.access(dirPath, (err) => {
    if (err) {
      createNewDir(dirPath);
    } else {
      console.log("The directory or file already exists.");
    }
  });
}

function writeFile(filePath, content) {
  try {
    fs.writeFileSync(filePath, content);
    console.log(`file created!`);
  } catch (err) {
    console.log(`error writing file: `, err);
  }
}

function createNewFile(dirPath, fileName, content) {
  const filePath = path.join(dirPath, fileName);

  // check if dir exist
  if (fs.existsSync(dirPath)) {
    // write file
    writeFile(filePath, content);
  } else {
    console.log(`directory does not exist, creating new ...`, dirPath);
    createNewDir(dirPath);
    writeFile(filePath, content);
  }
}

// WHAT HAPPENS IF NO DIRECTORY
// fs.writeFileSync(
//   path.join(process.cwd(), "directory_that_does_not_exist/", "testsssss.txt"),
//   `some text here `,
// ); // Error: ENOENT: no such file or directory,

// ONLY FOR FILES!!
function removeFile(path) {
  try {
    fs.unlinkSync(path);
    console.log(path, `deleted!`);
  } catch (err) {
    console.error(`Error deleting file`, err);
  }
}

function removeDir(pathToDir) {
  fs.stat(pathToDir, (err, stats) => {
    if (err) {
      return console.error("Error getting stats:", err);
    }

    if (stats.isFile()) {
      console.error(
        `Error while removing directory - it is a file not a directory!`,
      );
      return;
    }

    if (stats.isDirectory()) {
      fs.rmdir(pathToDir, (err) => {
        if (err) {
          console.error(`error while deleting file`, err);
          return;
        }
        console.log(`directory deleted successfully`);
      });
    }
  });
}

const dirPath = currentDir + `/test5`;
const filePath = path.join(dirPath, "testFile.txt");
// createDirAccessCheck();
// createDirIfDoesNotExist()
// createNewFile(dirPath, `test.txt`, `random string`);
// removeFile()
// const fileToBeRemoved = path.join(process.cwd(), "test3", "testFile.txt");
// removeFile(fileToBeRemoved);
// const dir = path.join(process.cwd(), "test3");
//
// removeDir(dir);
