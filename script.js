document.addEventListener("dragstart", event => {
  event.target.classList.add("dragging");
});

document.addEventListener("dragend", event => {
  event.target.classList.remove("dragging");
});

const columns = document.querySelectorAll(".column");

columns.forEach(column => {
  column.addEventListener("dragover", event => {
    const itemDragging = document.querySelector(".item.dragging");
    if (!itemDragging) return;

    event.preventDefault();

    const elementItemAfterDragging = getElementItemAfter(column, event.clientY);

    if (elementItemAfterDragging) {
      elementItemAfterDragging.insertAdjacentElement("beforebegin", itemDragging);
    } else {
      column.append(itemDragging);
    }
  });
});

function getElementItemAfter(column, mousePosY) {
  const columnItens = column.querySelectorAll(".item:not(.dragging)");

  for (let itemAfter of columnItens) {
    const box = itemAfter.getBoundingClientRect();
    const maxY = box.y + (box.height / 2);

    if (maxY > mousePosY) return itemAfter;
  }

  return null;
}

const kanban = document.querySelector(".kanban");

kanban.addEventListener("dragover", event => {
  const columnDragging = document.querySelector(".column.dragging");
  if (!columnDragging) return;

  event.preventDefault();

  const elementColumnAfterDragging = getElementColumnAfter(kanban, event.clientX);

  if (elementColumnAfterDragging) {
    elementColumnAfterDragging.insertAdjacentElement("beforebegin", columnDragging);
  } else {
    kanban.append(columnDragging);
  }
});

function getElementColumnAfter(kanban, mousePosY) {
  const columns = kanban.querySelectorAll(".column:not(.dragging)");

  for (let columnAfter of columns) {
    const box = columnAfter.getBoundingClientRect();
    const maxY = box.x + (box.width / 2);

    if (maxY > mousePosY) return columnAfter;
  }

  return null;
}