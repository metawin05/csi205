import React, { useState } from "react";
import { Button, Table, Form } from "react-bootstrap";
import { todosData } from "../data/todos";

export default function Todos() {

  const [todos, setTodos] = useState(todosData.filter((t) => !t.completed));
  const [newTodo, setNewTodo] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 10;

  const start = (page - 1) * perPage;
  const end = start + perPage;
  const pageTodos = todos.slice(start, end);

  const toggleStatus = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const addTodo = () => {
    if (newTodo.trim() === "") return;
    const newItem = {
      id: Date.now(),
      title: newTodo,
      completed: false,
    };
    setTodos((prev) => [newItem, ...prev]);
    setNewTodo("");
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Todos App</h2>

      <div className="d-flex mb-3">
        <Form.Control
          type="text"
          placeholder="Add new todo..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="me-2"
        />
        <Button onClick={addTodo}>Add</Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Task</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {pageTodos.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.id}</td>
              <td>{todo.title}</td>
              <td>{todo.completed ? "Done" : "Waiting"}</td>
              <td>
                <Button
                  size="sm"
                  variant={todo.completed ? "secondary" : "success"}
                  onClick={() => toggleStatus(todo.id)}
                  className="me-2"
                >
                  {todo.completed ? "Undo" : "Done"}
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => deleteTodo(todo.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="d-flex justify-content-between mt-3">
        <Button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          variant="outline-primary"
        >
          Prev
        </Button>
        <span>
          Page {page} / {Math.ceil(todos.length / perPage)}
        </span>
        <Button
          disabled={end >= todos.length}
          onClick={() => setPage((p) => p + 1)}
          variant="outline-primary"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
