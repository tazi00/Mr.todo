const asyncWrapper = require("../middlewares/async-wrapper");
const TodoService = require("../services/todos.services");

class TodoController {
  static getAllUserTodos = asyncWrapper(async (req, res) => {
    const userId = req.user.userId;
    const todos = await TodoService.getAllTodosByUserId(userId);
    res.json(todos);
  });

  static getTodoById = asyncWrapper(async (req, res) => {
    const todoId = req.params.todoId;
    const todo = await TodoService.getTodoById(todoId);
    if (todo) {
      res.json(todo);
    } else {
      res.status(404).json({ message: "Todo not found" });
    }
  });

  static getAllTodosByUserId = asyncWrapper(async (req, res) => {
    const userId = req.params.userId;
    const todos = await TodoService.getAllTodosByUserId(userId);
    res.json(todos);
  });

  static getTodoByUserIdAndTodoId = asyncWrapper(async (req, res) => {
    const userId = req.user.userId;
    const todoId = req.params.id; // Access the todoId from the route parameter
    const todo = await TodoService.getTodoByUserIdAndTodoId(userId, todoId);
    if (todo) {
      res.json(todo);
    } else {
      res.status(404).json({ message: "Todo not found" });
    }
  });
  

  static createTodo = asyncWrapper(async (req, res) => {
    const userId = req.user.userId;
    const todoData = req.body;
    const createdTodo = await TodoService.createTodo(userId, todoData);
    res.status(201).json(createdTodo);
  });

  static updateTodo = asyncWrapper(async (req, res) => {
    const todoId = req.params.todoId;
    const updatedTodoData = req.body;
    const updatedTodo = await TodoService.updateTodo(todoId, updatedTodoData);
    if (updatedTodo) {
      res.json(updatedTodo);
    } else {
      res.status(404).json({ message: "Todo not found" });
    }
  });

  static deleteTodo = asyncWrapper(async (req, res) => {
    const todoId = req.params.todoId;
    const result = await TodoService.deleteTodo(todoId);
    if (result) {
      res.json(result);
    } else {
      res.status(404).json({ message: "Todo not found" });
    }
  });
  static getUserAllTodosByUserId = asyncWrapper(async (req, res) => {
    const userId = req.params.userId;
    const todos = await TodoService.getAllTodosByUserId(userId);
    res.json(todos);
  });
}

module.exports = TodoController;
