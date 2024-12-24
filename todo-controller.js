const todoService = require("./todo-service");

const getTodos = (req, res) => {
  const todos = todoService.getAllTodos();
  res.status(200).json(todos);
};

const getTodoById = (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todoService.getTodoById(id);
  if (!todo) return res.status(404).json({ message: "Todo not found" });
  res.status(200).json(todo);
};

const createTodo = (req, res) => {
  try {
    const { title } = req.body;
    const newTodo = todoService.createTodo(title);
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateTodo = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { title } = req.body;
    const updatedTodo = todoService.updateTodo(id, title);
    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteTodo = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    todoService.deleteTodo(id);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  getTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
};
