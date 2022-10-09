import type { TodoType } from "../types";

type Props = TodoType & {
  onTodoDelete: (id: TodoType["id"]) => void;
  onTodoToggle: (id: TodoType["id"]) => void;
};

const TodoItem = (props: Props) => (
  <li className={props.isComplete ? "completed" : undefined}>
    <div className="view">
      <input
        className="toggle"
        type="checkbox"
        checked={props.isComplete}
        onChange={() => props.onTodoToggle(props.id)}
      />
      <label>{props.text}</label>
      <button
        className="destroy"
        onClick={() => props.onTodoDelete(props.id)}
      />
    </div>
  </li>
);

export default TodoItem;
