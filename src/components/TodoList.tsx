import TodoItem from "./TodoItem";
import type { TodoType } from "../types";
import { useParams } from "react-router-dom";
import { filterTodos } from "../lib/utils";

type Props = {
  todos: TodoType[];
  onTodoDelete: (id: TodoType["id"]) => void;
  onTodoToggle: (id: TodoType["id"]) => void;
};

const TodoList = (props: Props) => {
  const { filter } = useParams<{
    filter: "active" | "completed" | undefined;
  }>();

  return (
    <ul className="todo-list">
      {filterTodos(filter, props.todos).map((todo) => (
        <TodoItem
          key={todo.id}
          {...todo}
          onTodoDelete={props.onTodoDelete}
          onTodoToggle={props.onTodoToggle}
        />
      ))}
    </ul>
  );
};

export default TodoList;
