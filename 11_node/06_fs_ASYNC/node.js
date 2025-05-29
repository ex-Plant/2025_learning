const fs = require(`fs`);
const path = require(`path`);

const BASIC_ASYNC_FS_METHODS = `
- mkdir
- writeFile
- appendFile
- readFile
- deleteFile
- rmdir
- readdir
- stat
- access
- rm
`;

const cwd = process.cwd();

//1.
const MKDIR = `fs.mkdir(path, options, callback)`;

function mkDir(path) {
  fs.mkdir(path, (err) => {
    if (err) {
      console.log(`error making dir`, err);
      return;
    }
    console.log(`dir created!`);
  });
}
// const myPath = path.join(cwd, "test");
// mkDir(myPath);

//2.
const WRITE_FILE = `fs.writeFile(file, data, options)`;

function writeFile(fileName, content) {
  fs.writeFile(fileName, content, "utf-8", (err) => {
    if (err) {
      console.log(`error writing file:`, err);
      return;
    }
    console.log(`file write ok`);
  });
}

const writeFileName = path.join(cwd, "test", "writeFileTest.txt");
writeFile(writeFileName, "some content");

//3.
const APPEND_FILE = `fs.appendFile(file, data, options, callback)`;

function appendToFile(fileName, content) {
  fs.appendFile(fileName, content, "utf-8", (err) => {
    if (err) {
      console.log(`error while appending data to file`);
      return;
    }
    console.log(`appending operation ok`);
  });
}
// appendToFile(writeFileName, "some additional content");

//4.
const READ_FILE = `fs.readFile(path, options, callback)`;

function readFile(filePath) {
  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      console.log(`error while reading file:`, err);
      return;
    }
    console.log(data);
  });
}
readFile(writeFileName);

//5.
const DELETE_FILE = `fs.unlink(path, callback)`;

function deleteFile(filePath) {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.log(`error deleting file: `, err);
      return;
    }
    console.log(`File deleted!`, filePath);
  });
}
// deleteFile(writeFileName);

//6.
const RM_DIR = `fs.rmdir(path, options, callback)`;

function rmDir(dirPath) {
  fs.rmdir(dirPath, (err) => {
    if (err) {
      console.log(`err while removing dir: `, err);
      return;
    }
    console.log(`dir removed!`, dirPath);
  });
}

// mkDir(path.join(cwd, `test1`));
// rmDir(path.join(cwd, `test1`));

//7.
const READ_DIR = `fs.readdir(path, options, callback)`;

function readDir(dirPath) {
  fs.readdir(dirPath, (err, data) => {
    if (err) {
      console.log(`error while reading dir data: `, err);
      return;
    }
    console.log(data);
  });
}
// readDir(path.join(cwd, `test`)); // [ 'writeFileTest.txt' ]

// 8.
const STAT = `fs.stat(path, callback)`;

function getStats(path) {
  fs.stat(path, (err, stats) => {
    if (err) {
      console.log(`error while reading stats: `, err);
      return;
    }

    console.log(stats);
    console.log(stats.isDirectory());
    console.log(stats.isFile());
  });
}
getStats(cwd);

//9.
const ACCESS = `fs.access(path, mode, callback)`;
function checkIfExists(filePath) {
  fs.access(filePath, (err) => {
    if (err) {
      console.error("File/Directory does not exist:", err, filePath);
      return;
    }
    console.log("File/Directory exists: ", filePath);
  });
}

//10.
const RM = `fs.rm(path, options, callback)`;

function remove(path) {
  fs.rm(path, { recursive: true }, (err) => {
    if (err) {
      console.log(`error while deleting `, path, err);
      return;
    }
    console.log(`Deleted!: `, path);
  });
}
