const request = require("supertest");
const app = require("../app");

describe("Todo CRUD API", () => {
  it("should create a new todo", async () => {
    const response = await request(app)
      .post("/api/todos")
      .send({ title: "Learn Express" });

    expect(response.statusCode).toBe(201);
    expect(response.body.title).toBe("Learn Express");
  });

  it("should get all todos", async () => {
    const response = await request(app).get("/api/todos");
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("should get a specific todo by id", async () => {
    const todo = await request(app)
      .post("/api/todos")
      .send({ title: "Learn Jest" });

    const response = await request(app).get(`/api/todos/${todo.body.id}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe("Learn Jest");
  });

  it("should return 404 for non-existing todo", async () => {
    const response = await request(app).get("/api/todos/999");
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe("Todo not found");
  });

  it("should update a todo by id", async () => {
    const todo = await request(app)
      .post("/api/todos")
      .send({ title: "Learn Node.js" });

    const updatedResponse = await request(app)
      .put(`/api/todos/${todo.body.id}`)
      .send({ title: "Master Node.js" });

    expect(updatedResponse.statusCode).toBe(200);
    expect(updatedResponse.body.title).toBe("Master Node.js");
  });

  it("should delete a todo by id", async () => {
    const todo = await request(app)
      .post("/api/todos")
      .send({ title: "Delete me" });

    const deleteResponse = await request(app).delete(
      `/api/todos/${todo.body.id}`,
    );
    expect(deleteResponse.statusCode).toBe(204);
  });

  it("should return 404 for deleting a non-existing todo", async () => {
    const response = await request(app).delete("/api/todos/999");
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe("Todo not found");
  });
});
