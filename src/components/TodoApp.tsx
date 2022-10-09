import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import Footer from "./Footer";
import type { TodoType, TodoInputType } from "../types";
import { FormEventHandler, useEffect, useState } from "react";
import type { ChangeEventHandler } from "react";
import { destroyTodo, loadTodos, saveTodo, updateTodo } from "../lib/service";

const TodoApp = () => {
  const [currentTodo, setCurrentTodo] = useState("");
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [hasError, setHasError] = useState(false);

  const handleCurrentTodoChange: ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setCurrentTodo(event.currentTarget.value);
  };

  const handleTodoSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const newTodo: TodoInputType = {
      text: currentTodo,
      isComplete: false,
    };

    const data = await saveTodo(newTodo);

    if (data) {
      setTodos((prev) => [...prev, data]);
      setCurrentTodo("");
    } else {
      setHasError(true);
    }
  };

  const handleTodoDelete = async (id: TodoType["id"]) => {
    const isDeleted = await destroyTodo(id);

    if (isDeleted) {
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    }
  };

  const handleTodoToggle = async (id: TodoType["id"]) => {
    const targetTodo = todos.find((todo) => todo.id === id);

    if (!targetTodo) return;

    const updatedTodo = {
      ...targetTodo,
      isComplete: !targetTodo.isComplete,
    };

    const data = await updateTodo(updatedTodo);

    if (data) {
      const targetTodoIndex = todos.findIndex((todo) => todo.id === data.id);
      const nextTodos = [
        ...todos.slice(0, targetTodoIndex),
        data,
        ...todos.slice(targetTodoIndex + 1),
      ];

      setTodos(nextTodos);
    }
  };

  useEffect(() => {
    (async () => {
      const { ok, data } = await loadTodos();

      if (ok) {
        setTodos(data);
      } else {
        setHasError(true);
      }
    })();
  }, []);

  const remainingCount = todos.filter((todo) => !todo.isComplete).length;

  return (
    <Router>
      <div className="todoapp">
        <header className="header">
          <h1>todos</h1>
          {hasError && <span className="error">Oh no!</span>}
          <TodoForm
            currentTodo={currentTodo}
            onCurrentTodoChange={handleCurrentTodoChange}
            onTodoSubmit={handleTodoSubmit}
          />
        </header>
        <section className="main">
          <Routes>
            <Route path="/">
              <Route
                index
                element={
                  <TodoList
                    todos={todos}
                    onTodoDelete={handleTodoDelete}
                    onTodoToggle={handleTodoToggle}
                  />
                }
              />
              <Route
                path=":filter"
                element={
                  <TodoList
                    todos={todos}
                    onTodoDelete={handleTodoDelete}
                    onTodoToggle={handleTodoToggle}
                  />
                }
              />
            </Route>
          </Routes>
        </section>
        <Footer remainingCount={remainingCount} />
      </div>
    </Router>
  );
};

export default TodoApp;
