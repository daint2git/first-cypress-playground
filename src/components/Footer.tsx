import { Link } from "react-router-dom";

type Props = {
  remainingCount: number;
};

const Footer = (props: Props) => (
  <footer className="footer">
    <span className="todo-count">
      <strong>{props.remainingCount}</strong>
      {props.remainingCount > 1 ? " todos" : " todo"} left
    </span>
    <ul className="filters">
      <li>
        <Link to="/">All</Link>
      </li>{" "}
      <li>
        <Link to="/active">Active</Link>
      </li>{" "}
      <li>
        <Link to="/completed">Completed</Link>
      </li>
    </ul>
  </footer>
);

export default Footer;
