const { getFileData, setFileData } = require("../utils/generic");
const { v4: uuidv4 } = require("uuid");

const getAllUsers = async () => {
  const usersData = await getFileData("users");
  return usersData;
};

const getUserById = async (userId) => {
  const usersData = await getFileData("users");
  return usersData.find((user) => user.id === userId);
};

const createUser = async (userData) => {
  const usersData = await getFileData("users");
  const newUser = {
    id: uuidv4(),
    ...userData,
  };
  usersData.push(newUser);
  await setFileData("users", usersData);
  return newUser;
};

const updateUser = async (userId, updatedUserData) => {
  const usersData = await getFileData("users");
  const userIndex = usersData.findIndex((user) => user.id === userId);

  if (userIndex === -1) {
    return null; // User not found
  }

  const updatedUser = { ...usersData[userIndex], ...updatedUserData };
  usersData[userIndex] = updatedUser;
  await setFileData("users", usersData);
  return updatedUser;
};

const deleteUser = async (userId) => {
  const usersData = await getFileData("users");
  const filteredUsers = usersData.filter((user) => user.id !== userId);

  if (usersData.length === filteredUsers.length) {
    return null; // User not found
  }

  await setFileData("users", filteredUsers);
  return { message: "User deleted successfully" };
};

const getUserByEmail = async (email) => {
  const usersData = await getFileData("users");
  return usersData.find((user) => user.email === email);
};

const getUserByUserName = async (username) => {
  const usersData = await getFileData("users");
  return usersData.find((user) => user.username === username);
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserByEmail,
  getUserByUserName,
};
