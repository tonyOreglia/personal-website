import React from 'react';
import { lookupPieceToRender } from './chess/chess'

export default function Square(props) {
  const piece = lookupPieceToRender(props.value)
  const row = ~~(props.index / 8)
  const darkSq = (props.index%2 + (row%2))%2 !== 0;
  let background = null;
  if (props.selected) {
    background = 'rgb(255, 246, 124)';
  }
  let button =
  <button className="square light" onClick={props.onClick} style={{ background: background }}>
    {piece}
  </button>
  if (darkSq) {
    button =
    <button className="square dark" onClick={props.onClick} style={{ background: background }}>
      {piece}
    </button>
  }
  return (button);
}