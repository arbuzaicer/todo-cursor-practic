import { formatRelative } from "date-fns";

import { ENTER_KEY_CODE } from "../../utils/constants";
import { getLocalTodos, updateTodos } from "../../utils/functions";

let editingID = null;

export function renderSingleTodo({ title, date, selected, id, index }) {
  let titleElement;
  let initialEditValue = title;
  const isEditing = editingID === id;

  const wrapper = document.createElement("div");
  wrapper.classList.add("single");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = selected;
  checkbox.classList.add("checkbox");
  wrapper.append(checkbox);

  checkbox.addEventListener("input", (e) => {
    const selected = e.target.checked;

    updateCheckedState({
      index,
      selected,
    });
  });

  const content = document.createElement("div");
  content.classList.add("content");

  if (isEditing) {
    titleElement = document.createElement("input");
    titleElement.value = initialEditValue;

    const timerID = setTimeout(() => {
      titleElement.focus();

      clearTimeout(timerID);
    }, 300);

    titleElement.addEventListener("input", (e) => {
      initialEditValue = e.target.value;
    });

    titleElement.addEventListener("keydown", (e) => {
      if (e.key === ENTER_KEY_CODE) {
        editTodo({ id, selected, title: initialEditValue, index });
      }
    });

    titleElement.addEventListener("blur", () => {
      editingID = null;

      updateTodos(getLocalTodos());
    });
  } else {
    titleElement = document.createElement("p");
    titleElement.classList.add("title");
    titleElement.textContent = title;
  }

  const dateElement = document.createElement("p");
  dateElement.classList.add("date");
  dateElement.textContent = formatRelative(new Date(date), new Date());

  const actions = document.createElement("div");
  actions.classList.add("actions");

  const editElement = document.createElement("i");
  editElement.className = "far fa-edit";

  editElement.addEventListener("click", () => {
    editingID = id;
    updateTodos(getLocalTodos());
  });

  const removeElement = document.createElement("i");
  removeElement.className = "far fa-trash-alt";
  removeElement.addEventListener("click", removeItem.bind(null, id));

  actions.append(editElement);
  actions.append(removeElement);

  content.append(titleElement);
  content.append(dateElement);

  wrapper.append(content);
  wrapper.append(actions);

  return wrapper;
}

function updateCheckedState({ selected, index }) {
  const todos = getLocalTodos();

  if (!todos.length) {
    return;
  }

  todos[index].selected = selected;

  updateTodos(todos);
}

function removeItem(id) {
  const todos = getLocalTodos();
  const updatedTodos = todos.filter((el) => el.id !== id);

  updateTodos(updatedTodos);
}

function editTodo({ id, selected, title, index }) {
  const todos = getLocalTodos();
  const currentDate = new Date();

  const todoItem = {
    id,
    title,
    selected,
    date: currentDate,
  };

  todos[index] = todoItem;
  editingID = null;

  updateTodos(todos);
}
