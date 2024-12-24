const todoService = require("../todo-service");

describe("Todo Service", () => {
  beforeEach(() => {
    todoService.setTodos([]);
    todoService.setCurrentId(1);
  });

  it("should create a new todo", () => {
    const todo = todoService.createTodo("Test Todo");
    expect(todo.title).toBe("Test Todo");
    expect(todo.id).toBe(1);
  });

  it("should get all todos", () => {
    todoService.createTodo("Todo 1");
    todoService.createTodo("Todo 2");

    const todos = todoService.getAllTodos();
    expect(todos.length).toBe(2);
    expect(todos[0].title).toBe("Todo 1");
    expect(todos[1].title).toBe("Todo 2");
  });

  it("should get a todo by id", () => {
    const todo = todoService.createTodo("Test Todo");
    const fetchedTodo = todoService.getTodoById(todo.id);
    expect(fetchedTodo).toEqual(todo);
  });

  it("should throw an error when creating a todo without title", () => {
    expect(() => {
      todoService.createTodo("");
    }).toThrow("Title is required");
  });

  it("should update a todo by id", () => {
    const todo = todoService.createTodo("Old Title");
    const updatedTodo = todoService.updateTodo(todo.id, "New Title");

    expect(updatedTodo.title).toBe("New Title");
    expect(updatedTodo.id).toBe(todo.id);
  });

  it("should throw an error when updating a non-existing todo", () => {
    expect(() => {
      todoService.updateTodo(999, "Title");
    }).toThrow("Todo not found");
  });

  it("should delete a todo by id", () => {
    const todo = todoService.createTodo("Delete Me");
    const deleteResult = todoService.deleteTodo(todo.id);

    expect(deleteResult).toBe(true);
    expect(todoService.getAllTodos().length).toBe(0);
  });

  it("should throw an error when deleting a non-existing todo", () => {
    expect(() => {
      todoService.deleteTodo(999);
    }).toThrow("Todo not found");
  });
});
