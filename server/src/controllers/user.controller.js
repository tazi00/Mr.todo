const asyncWrapper = require("../middlewares/async-wrapper");
const UserService = require("../services/users.services");

class UserController {
  static getAllUsers = asyncWrapper(async (req, res) => {
    const users = await UserService.getAllUsers();
    res.json(users);
  });
  static getCurrentUsers = asyncWrapper(async (req, res) => {
    const userId = req.user.userId;
    const currentUser = await UserService.getUserById(userId);
    if (currentUser) {
      res.json(currentUser);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  });

  static getUserById = asyncWrapper(async (req, res) => {
    const userId = req.params.userId;
    const user = await UserService.getUserById(userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  });

  static createUser = asyncWrapper(async (req, res) => {
    const userData = req.body;
    const createdUser = await UserService.createUser(userData);
    res.status(201).json(createdUser);
  });

  static updateUser = asyncWrapper(async (req, res) => {
    const userId = req.params.userId;
    const updatedUserData = req.body;
    const updatedUser = await UserService.updateUser(userId, updatedUserData);
    if (updatedUser) {
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  });

  static deleteUser = asyncWrapper(async (req, res) => {
    const userId = req.params.userId;
    const result = await UserService.deleteUser(userId);
    if (result) {
      res.json(result);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  });

  static getUserByEmail = asyncWrapper(async (req, res) => {
    const email = req.params.email;
    const user = await UserService.getUserByEmail(email);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  });

  static getUserByUserName = asyncWrapper(async (req, res) => {
    const username = req.params.username;
    const user = await UserService.getUserByUserName(username);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  });
}

module.exports = UserController;
