import { useState, useRef } from "react";
import styled, { keyframes } from "styled-components";

const bounce = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  line-height: 0;
  padding: 30px 18px;
  margin: 5px 0;
  color: black;
  background: #ddd;
  transition: background 0.2s ease-in-out, transform 0.2s ease-in-out;
  border-radius: 10px;
  min-width: 200px;
  &:active {
    background: #bbb;
  }
  &.dragging {
    background: #aaa;
    animation: ${bounce} 0.3s ease-in-out;
    opacity: 1;
    transform: scale(1.1);
  }
`;

const DragHandle = styled.span`
  cursor: grab;
  margin-right: 20px;
  color: gray;
  font-weight: bolder;
  font-size: x-large;
  line-height: 0;
  user-select: none;
  &:hover {
    color: white;
  }
  &:active {
    cursor: grabbing;
  }
`;

const DraggableList = () => {
  const [items, setItems] = useState([
    "Lion 🦁",
    "Turtle 🐢",
    "Whale 🐳",
    "Bumble Bee 🐝",
    "Elephant 🐘",
  ]);
  const draggedItem = useRef(null);
  const placeholderIndex = useRef(null);

  const handleDragStart = (e, index) => {
    draggedItem.current = index;
    placeholderIndex.current = index;
    e.dataTransfer.effectAllowed = "move";
    e.target.closest("li").classList.add("dragging");
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (placeholderIndex.current === index) return;

    const newList = [...items];
    const item = newList.splice(draggedItem.current, 1)[0];
    newList.splice(index, 0, item);
    setItems(newList);
    draggedItem.current = index;
    placeholderIndex.current = index;
  };

  const handleDragEnd = (e) => {
    draggedItem.current = null;
    placeholderIndex.current = null;
    e.target.closest("li").classList.remove("dragging");
  };

  return (
    <List>
      {items.map((item, index) => (
        <ListItem
          key={item}
          onDragOver={(e) => handleDragOver(e, index)}
          className={draggedItem.current === index ? "dragging" : ""}
        >
          <DragHandle
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragEnd={handleDragEnd}
          >
            =
          </DragHandle>
          {item}
        </ListItem>
      ))}
    </List>
  );
};

export default DraggableList;
