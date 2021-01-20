import React from "react";
import Piece from "./pieces/pieces";

export default function Square(props) {
  const pieceProps = {
    ...props.value,
    index: props.index,
    selectSquare: props.onClick,
  };
  const piece = Piece(pieceProps);
  const row = ~~(props.index / 8);
  const darkSq = ((props.index % 2) + (row % 2)) % 2 !== 0;
  let background = null;
  if (props.selected) {
    background = "rgb(79, 148, 84)";
  }
  if (darkSq) {
    return (
      <button
        className="square dark"
        onClick={props.onClick}
        style={{ background: background }}
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDrop={(e) => {
          props.onClick();
        }}
      >
        {piece}
      </button>
    );
  }
  return (
    <button
      className="square light"
      onClick={props.onClick}
      style={{ background: background }}
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDrop={(e) => {
        props.onClick();
      }}
    >
      {piece}
    </button>
  );
}
