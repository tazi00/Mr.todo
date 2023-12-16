const express = require("express");
const UserController = require("../controllers/user.controller");
const TodoController = require("../controllers/todos.controller");
const userRouter = express.Router();

userRouter.get("/todos", TodoController.getAllUserTodos);
userRouter.post("/todos", TodoController.createTodo);
userRouter.get("/todos/:id", TodoController.getTodoByUserIdAndTodoId);
userRouter.get("/", UserController.getCurrentUsers);
userRouter.get("/all", UserController.getAllUsers);
userRouter.get("/:userId", UserController.getUserById);
userRouter.get("/:userId/todos", TodoController.getUserAllTodosByUserId);
// userRouter.get("/:userId/todos/:todoId", UserController.getUserById);
userRouter.post("/", UserController.createUser);
userRouter.put("/:userId", UserController.updateUser);
userRouter.delete("/:userId", UserController.deleteUser);
userRouter.get("/email/:email", UserController.getUserByEmail);
userRouter.get("/username/:username", UserController.getUserByUserName);
module.exports = userRouter;
