import type { ChangeEventHandler, FormEventHandler } from "react";

type Props = {
  currentTodo: string;
  onCurrentTodoChange: ChangeEventHandler<HTMLInputElement>;
  onTodoSubmit: FormEventHandler<HTMLFormElement>;
};

const TodoForm = (props: Props) => (
  <form onSubmit={props.onTodoSubmit}>
    <input
      type="text"
      className="new-todo"
      placeholder="What needs to be done?"
      autoFocus
      value={props.currentTodo}
      onChange={props.onCurrentTodoChange}
    />
  </form>
);

export default TodoForm;
