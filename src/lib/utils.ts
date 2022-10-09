import type { TodoType } from "../types";

export const filterTodos = (
  filter: "active" | "completed" | undefined,
  todos: TodoType[]
) => {
  return filter
    ? todos.filter((todo) => todo.isComplete === (filter === "completed"))
    : todos;
};
