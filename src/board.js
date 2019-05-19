import React from 'react';
import Square from "./square"
import Chess from 'chess.js';
import { indexToAlgebraic } from './chess/chess'

export default class Board extends React.Component {
  renderSquare(i, value) {
    let selected = i === this.props.selected;
    return (
      <Square
        key={i}
        value={value}
        onClick={() => this.props.onClick(i)}
        index={i}
        selected={selected}
        // onDragOver={(e) => {console.log("dragging over!");}}
        // onDrop={(e) => {
        //   console.log("dropping!!!");
        //   this.props.onClick(i);
        // }}
      />
    );
  }

  render() {
    const position = Chess();
    position.load(this.props.position);
    let sqs;
    let rows = [];
    let index;
    for (let i = 0; i < 8; i++) {
      sqs = [];
      for (let j = 0; j < 8; j++) {
        index = j + i*8;
        sqs.push(this.renderSquare(index, position.get(indexToAlgebraic(index))));
      }
      rows.push(
      <div key={i} className="board-row">
        {sqs}
      </div>
      )
    }
    return (
      <div>
        {rows}
      </div>
    );
  }
}