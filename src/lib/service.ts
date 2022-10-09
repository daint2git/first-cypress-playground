import type { TodoType, TodoInputType } from "../types";

export const saveTodo = async (todo: TodoInputType) => {
  const response = await fetch("http://localhost:3030/api/todos", {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(todo),
  });

  if (response.ok) {
    const data = await response.json();

    return data as TodoType;
  }

  return undefined;
};

export const loadTodos = async () => {
  const response = await fetch("http://localhost:3030/api/todos", {
    method: "GET",
  });

  if (response.ok) {
    return {
      ok: true,
      data: (await response.json()) as TodoType[],
    };
  }

  return {
    ok: false,
    data: [],
  };
};

export const destroyTodo = async (id: TodoType["id"]) => {
  const response = await fetch("http://localhost:3030/api/todos/" + id, {
    method: "DELETE",
  });

  return response.ok;
};

export const updateTodo = async (todo: TodoType) => {
  const response = await fetch("http://localhost:3030/api/todos/" + todo.id, {
    method: "PUT",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(todo),
  });

  if (response.ok) {
    const data = await response.json();

    return data as TodoType;
  }

  return undefined;
};
