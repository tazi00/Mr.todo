const fs = require("fs/promises");
const path = require("path");

const getDataFilePath = (fileName) =>
  path.resolve(__dirname, `../../data/${fileName}.json`);

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const getFileData = async (fileName) => {
  try {
    await delay(2000);
    const filePath = getDataFilePath(fileName);
    const fileData = await fs.readFile(filePath, "utf-8");
    return JSON.parse(fileData);
  } catch (error) {
    // If the file doesn't exist or there is an error reading it, return an empty array
    return [];
  }
};

const setFileData = async (fileName, data) => {
  try {
    await delay(2000);
    const filePath = getDataFilePath(fileName);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    throw new Error(`Error writing data to ${fileName}.json: ${error.message}`);
  }
};

module.exports = { getFileData, setFileData };
