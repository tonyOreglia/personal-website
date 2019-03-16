import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import bunyan from 'bunyan';
import { websocketConnect } from './websocket'
const Chess = require('./chess').Chess;

const logger = bunyan.createLogger({
  name: 'chess-board'
});

function Square(props) {
  const row = ~~(props.index / 8)
  const darkSq = (props.index%2 + (row%2))%2 !== 0;
  let background = null;
  if (props.selected) {
    background = 'rgb(255, 246, 124)';
  }
  let button =
  <button className="light-square" onClick={props.onClick} style={{ background: background }}>
    {props.value}
  </button>
  if (darkSq) {
    button =
    <button className="dark-square" onClick={props.onClick} style={{ background: background }}>
      {props.value}
    </button>
  }
  return (button);
}

class Board extends React.Component {
  renderSquare(i) {
    let selected = false;
    if (i === this.props.selected) {
      selected = true;
    }
    return (
      <Square
        key={i}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        index={i}
        selected={selected}
      />
    );
  }

  render() {
    let sqs;
    let rows = [];
    for (let i = 0; i < 8; i++) {
      sqs = [];
      for (let j = 0; j < 8; j++) {
        sqs.push(this.renderSquare(j + i*8));
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

class Game extends React.Component {
  constructor(props) {
    super(props);
    const chess = new Chess();
    const blackStartingPos = [
      '♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜',
      '♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟']
    const whiteStartingPos = [
      '♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙',
      '♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖']
    this.state = {
      history: [{
        squares: blackStartingPos.concat(Array(32).fill(null), whiteStartingPos)
      }],
      stepNumber: 0,
      selectedSq: null,
      engineName: "",
      engineAuthor: "",
      uciOK: false,
      isReady: false,
    };
    this.ws = websocketConnect("ws://localhost:8081/uci");
    this.ws.onmessage = (event) => {
      const msg = event.data
      this.processEngineMessage(msg)
    }
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step
    });
  }

  handleClick(i) {
    // unset the selected square if it's reclicked
    if (i === this.state.selectedSq) {
      this.setState({
        selectedSq: null
      });
      return;
    }

    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const board = current.squares.slice();
    const previouslySelectedSq = this.state.selectedSq
    
    const previouslySelectedSquareContainsPiece = previouslySelectedSq != null && board[previouslySelectedSq] !== null
    if (previouslySelectedSquareContainsPiece) {
      // const moveAlgebraic = this.convertToAlgebraic(previouslySelectedSq, i)

      board[i] = board[previouslySelectedSq];
      board[previouslySelectedSq] = null;
      this.setState({
        history: history.concat([{
          squares: board
        }]),
        selectedSq: null,
        stepNumber: history.length,
      })
      return;
    }
    
    this.setState({
      selectedSq: i
    });
  }

  convertToAlgebraic() {

  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];

    return (
      <div>
        <header className="main-title" >{this.state.engineName}</header>
        <header className="second-title" >{this.state.engineAuthor}</header>
        <div className="game">
          <div>
            <Board
              squares={current.squares}
              onClick={(i) => this.handleClick(i)}
              selected={this.state.selectedSq}
            />
          </div>
        </div>
      </div>
    );
  }
  
  processEngineMessage(msg) {
    const msgTokens = msg.split(" ")
    logger.info(`Recieved message: ${msg}`);
    switch(msgTokens[0]) {
      case "id":
        logger.info("engine reporting id")
        this.processId(msgTokens.slice(1))
        break;
      case "uciok":
        logger.info(`revieved uciok`);
        this.setState({
          uciOK: true
        })
        break;
      case "readyok":
        logger.info(`revieved readyok`);
        this.setState({
          isReady: true
        })
        break;
      case "bestmove":
        break;
      case "copyprotection":
        break;
      case "registration":
        break;
      case "info":
        this.processInfo(msgTokens.slice(1));
        break;
      case "option":
        logger.info(`command: ${msgTokens[0]} is not yet handled.`);
        break;
      default:
        logger.info(`command: ${msgTokens[0]} is not yet handled.`);
    }
  }

  processInfo(msgTokens) {
    logger.info(`processing info: ${msgTokens.join(" ")}`)
  }
  
  processId(msgTokens) {
    switch(msgTokens[0]) {
      case "name":
        logger.info("engine reporting id name")
        if (msgTokens.length < 2) {
          logger.error(`unhandled message: ${JSON.stringify(msgTokens)}`)
          break
        }
        this.setState({
          engineName: `Running Engine - ${msgTokens.slice(1).join(" ")}`
        });
        break;
      case "author":
        logger.info("engine reporting id author")
        if (msgTokens.length < 2) {
          logger.error(`unhandled message: ${JSON.stringify(msgTokens)}`)
          break
        }
        this.setState({
          engineAuthor: `by ${msgTokens.slice(1).join(" ")}`
        })
        break;
      default:
        logger.error(`unrecognized id: ${msgTokens}`)
    }
  }
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
