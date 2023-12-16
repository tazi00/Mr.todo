const { getFileData, setFileData } = require("../utils/generic");
const { v4: uuidv4 } = require("uuid");

class TodoService {
  static async getAllUserTodos(userId) {
    const todos = await getFileData("todos");
    return todos.filter((todo) => todo.userId === userId && !todo.deleted);
  }

  static async getUserTodoById(userId, todoId) {
    const todos = await getFileData("todos");
    return todos.find(
      (todo) => todo.userId === userId && todo.id === todoId && !todo.deleted
    );
  }

  static async getAllTodosByUserId(otherUserId) {
    const todos = await getFileData("todos");
    return todos.filter((todo) => todo.userId === otherUserId && !todo.deleted);
  }

  static async getTodoByUserId(otherUserId, todoId) {
    const todos = await getFileData("todos");
    return todos.find(
      (todo) =>
        todo.userId === otherUserId && todo.id === todoId && !todo.deleted
    );
  }

  static async createTodo(userId, todoData) {
    const todos = await getFileData("todos");
    const newTodo = {
      ...todoData,
      id: uuidv4(),
      completed: false,
      deleted: false,
      userId: userId,
    };
    todos.push(newTodo);
    await setFileData("todos", todos);
    return newTodo;
  }

  static async updateTodo(todoId, updatedTodoData) {
    const todos = await getFileData("todos");
    const index = todos.findIndex(
      (todo) => todo.id === todoId && !todo.deleted
    );
    if (index !== -1) {
      todos[index] = { ...todos[index], ...updatedTodoData };
      await setFileData("todos", todos);
      return todos[index];
    } else {
      return null;
    }
  }

  static async deleteTodo(todoId) {
    const todos = await getFileData("todos");
    const index = todos.findIndex(
      (todo) => todo.id === todoId && !todo.deleted
    );
    if (index !== -1) {
      todos[index].deleted = true;
      await setFileData("todos", todos);
      return { message: "Todo deleted successfully" };
    } else {
      return null;
    }
  }
  static async getTodoByUserIdAndTodoId(userId, todoId) {
    const todos = await getFileData("todos");
    return todos.find(
      (todo) => todo.userId === userId && todo.id === todoId && !todo.deleted
    );
  }
}

module.exports = TodoService;
