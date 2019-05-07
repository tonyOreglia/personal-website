import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Chess from 'chess.js';
import Game from "./game"

ReactDOM.render(
  <Game chess={Chess()}/>,
  document.getElementById('root')
);
