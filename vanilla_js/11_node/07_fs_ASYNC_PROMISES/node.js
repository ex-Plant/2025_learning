import { promises as fs } from "fs.js";
import path from "path.js";

const EXPLANATION = `
Using async methods with promises is almost the same as using them with callbacks, but needs some changes in the syntax
`;

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
- rename
`;

const cwd = process.cwd();

//1.
const MKDIR = `fs.mkdir(path, options)`;
async function mkDir(path) {
  try {
    await fs.mkdir(path, { recursive: true });
    console.log(`dir created!`);
  } catch (err) {
    console.log(`error making dir`, err);
  }
}

//2.
const WRITE_FILE = `fs.writeFile(file, data, options, callback)`;
async function writeFile(fileName, content) {
  try {
    await fs.writeFile(fileName, content, "utf-8");
    console.log(`file write ok`);
  } catch (err) {
    console.log(`error writing file:`, err);
  }
}

//3.
const APPEND_FILE = `fs.appendFile(file, data, options, callback)`;
async function appendToFile(fileName, content) {
  try {
    await fs.appendFile(fileName, content, "utf-8");
    console.log(`appending operation ok`);
  } catch (e) {
    console.log(`error while appending data to file`, e);
  }
}

//4.
const READ_FILE = `fs.readFile(path, options, callback)`;
async function readFile(filePath) {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    console.log(data);
  } catch (e) {
    console.log(`error while reading file:`, e);
  }
}

//5.
const DELETE_FILE = `fs.unlink(path, callback)`;
async function deleteFile(filePath) {
  try {
    await fs.unlink(filePath);
    console.log(`File deleted!`, filePath);
  } catch (e) {
    console.log(`error deleting file: `, e);
  }
}

//6.
const RM_DIR = `fs.rmdir(path, options, callback)`;
async function rmDir(dirPath) {
  try {
    await fs.rmdir(dirPath);
    console.log(`dir removed!`, dirPath);
  } catch (err) {
    console.log(`err while removing dir: `, err);
  }
}

//7.
const READ_DIR = `fs.readdir(path, options, callback)`;
async function readDir(dirPath) {
  try {
    const data = await fs.readdir(dirPath);
    console.log(data);
  } catch (err) {
    console.log(`error while reading dir data: `, err);
  }
}

// 8.
const STAT = `fs.stat(path, callback)`;
async function getStats(path) {
  try {
    const stats = await fs.stat(path);
    console.log(stats);
    console.log(stats.isDirectory());
    console.log(stats.isFile());
  } catch (err) {
    console.log(`error while reading stats: `, err);
  }
}

//9.
const ACCESS = `fs.access(path, mode, callback)`;
async function checkIfExists(filePath) {
  try {
    await fs.access(filePath);
    console.log("File/Directory exists: ", filePath);
  } catch (err) {
    console.error("File/Directory does not exist:", err, filePath);
  }
}

//10.
const RM = `fs.rm(path, options, callback)`;
async function remove(path) {
  try {
    await fs.rm(path, { recursive: true });
    console.log(`Deleted!: `, path);
  } catch (err) {
    console.log(`error while deleting `, path, err);
  }
}

//1.
const RENAME = `fs.rename(path, options, callback)`;

async function rename(oldPath, newPath) {
  try {
    await fs.rename(oldPath, newPath);
    console.log("File renamed successfully! New file name:", newPath);
  } catch (err) {
    console.log(`Error while renaming the file: `, err);
  }
}

const writeFileName = path.join(cwd, "test", "writeFileTest.txt");
const myPath = path.join(cwd, "test");

const newFile = path.join(cwd, `test.txt`);
try {
  await fs.writeFile(newFile, "test content", "utf-8");
  console.log(`file written`);
  const data = await fs.readFile(newFile, "utf-8");
  console.log(`reading file: `, data);
} catch (err) {
  console.log(`something went wrong: `, err);
}

await rename(newFile, `newShinyFile.txt`);

// await mkDir(path.join(cwd, `test1`));
// await writeFile(writeFileName, "some content");
// await appendToFile(writeFileName, "some additional content");
// await readFile(writeFileName);
// await deleteFile(writeFileName);
// await rmDir()
// await readDir(path.join(cwd, `test`)); // [ 'writeFileTest.txt' ]
// await getStats(cwd);
// await checkIfExists(cwd);
// await remove(path);
