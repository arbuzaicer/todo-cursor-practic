import { todos } from "../../index.js";

import { ENTER_KEY_CODE } from "../../utils/constants";
import { getByDataAttribute, updateTodos } from "../../utils/functions";

let todoContent = "";

const input = getByDataAttribute("main-input");

input.addEventListener("input", (e) => {
  todoContent = e.target.value;
});

input.addEventListener("keydown", (e) => {
  if (e.key === ENTER_KEY_CODE) {
    const currentDate = new Date();

    const todoItem = {
      date: currentDate,
      title: todoContent,
      selected: false,
      id: currentDate.valueOf(),
    };

    todos.push(todoItem);

    updateTodos(todos);

    input.value = "";
    todoContent = "";
  }
});
