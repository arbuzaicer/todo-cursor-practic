import { renderSingleTodo } from "../components/TodoSingle/TodoSinge";
import { STORAGE_KEY } from "./constants";
import { todosSection } from "../index.js";

export function getByDataAttribute(attribute) {
  return document.querySelector(`[data-${attribute}]`);
}

export function getLocalTodos() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY));
}

export function setLocalTodos(array) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(array));
}

export function updateTodos(array) {
  setLocalTodos(array);

  todosSection.innerHTML = "";

  array.forEach((el, index) => {
    todosSection.append(renderSingleTodo({ ...el, index }));
  });
}
