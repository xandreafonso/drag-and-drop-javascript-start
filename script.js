const allItens = document.querySelectorAll(".item");

allItens.forEach(item => {
  item.addEventListener("dragstart", event => {
    const item = event.target;
    item.classList.add("dragging");
  });
  
  item.addEventListener("dragend", event => {
    const item = event.target;
    item.classList.remove("dragging");
  });
});


const columns = document.querySelectorAll(".column");

columns.forEach(column => {
  column.addEventListener("dragover", event => {
    event.preventDefault();

    const itemDragging = document.querySelector(".dragging");
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
