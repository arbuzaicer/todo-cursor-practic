import "./styles/reset.scss";
import "./styles/styles.scss";

import "./components/MainInput/MainInput.js";
import {
  getByDataAttribute,
  getLocalTodos,
  updateTodos,
} from "./utils/functions";

export const todos = getLocalTodos() || [];

const root = getByDataAttribute("root");

export const todosSection = document.createElement("div");
todosSection.classList.add("todo-list-container");

root.append(todosSection);

if (todos.length) {
  updateTodos(todos);
}
