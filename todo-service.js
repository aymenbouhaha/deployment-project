let todos = [];
let currentId = 1;

const setTodos = (newTodos) => (todos = newTodos);
const setCurrentId = (newCurrentId) => (currentId = newCurrentId);

const getAllTodos = () => {
  return todos;
};

const getTodoById = (id) => {
  return todos.find((t) => t.id === id);
};

const createTodo = (title) => {
  if (!title) throw new Error("Title is required");

  const newTodo = { id: currentId++, title };
  todos.push(newTodo);
  return newTodo;
};

const updateTodo = (id, title) => {
  const todoIndex = todos.findIndex((t) => t.id === id);
  if (todoIndex === -1) throw new Error("Todo not found");

  if (!title) throw new Error("Title is required");

  todos[todoIndex].title = title;
  return todos[todoIndex];
};

const deleteTodo = (id) => {
  const todoIndex = todos.findIndex((t) => t.id === id);
  if (todoIndex === -1) throw new Error("Todo not found");

  todos.splice(todoIndex, 1);
  return true;
};

module.exports = {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
  setTodos,
  setCurrentId,
};
