import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import bunyan from 'bunyan';
import { websocketConnect } from './websocket'
import { indexToAlgebraic, lookupPieceToRender } from './chess/chess'
import Chess from 'chess.js';
const logger = bunyan.createLogger({
  name: 'chess-board'
});

function Square(props) {
  logger.info(`value: ${JSON.stringify(props.value)}`)
  const piece = lookupPieceToRender(props.value)
  const row = ~~(props.index / 8)
  const darkSq = (props.index%2 + (row%2))%2 !== 0;
  let background = null;
  if (props.selected) {
    background = 'rgb(255, 246, 124)';
  }
  let button =
  <button className="light-square" onClick={props.onClick} style={{ background: background }}>
    {piece}
  </button>
  if (darkSq) {
    button =
    <button className="dark-square" onClick={props.onClick} style={{ background: background }}>
      {piece}
    </button>
  }
  return (button);
}

class Board extends React.Component {
  renderSquare(i, value) {
    let selected = i === this.props.selected;
    return (
      <Square
        key={i}
        value={value}
        onClick={() => this.props.onClick(i)}
        index={i}
        selected={selected}
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

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        position: this.props.chess.fen(),
        move: "",
      }],
      ply: 0,
      selectedSq: null,
      engineName: "",
      engineAuthor: "",
      uciOK: false,
      isReady: false,
      engineThinking: false,
      playersTurn: true,
    };
    this.ws = websocketConnect("ws://206.189.195.210:8081/uci");
    this.ws.onmessage = (event) => {
      const msg = event.data
      this.processEngineMessage(msg)
    }
  }

  jumpTo(step) {
    this.setState({
      ply: step
    });
  }

  handleClick(i) {
    // unset the selected square if it's reclicked or 
    // it's not the players turn
    if (i === this.state.selectedSq || !this.state.playersTurn) {
      this.setState({
        selectedSq: null
      });
      return;
    }

    // if no sq already selected, just highlight the clicked sq
    if (this.state.selectedSq === null) {
      this.setState({
        selectedSq: i
      });
      return;
    }

    const from = indexToAlgebraic(this.state.selectedSq)
    const to = indexToAlgebraic(i)
    const move = this.props.chess.move({ from, to })

    if (move) {
      const history = this.state.history.slice();
      this.setState({
        history: history.concat([{
          position: this.props.chess.fen(),
          move: move
        }]),
        selectedSq: null,
        ply: history.length,
        playersTurn: false,
        engineThinking: true,
      })
      // tell engine that move has been made
      this.ws.send(`position ${this.props.chess.fen()}`)
      // tell engine to think of a move!
      this.ws.send(`go`)
      return;
    }

    this.setState({
      selectedSq: i
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.ply];

    return (
      <div>
        <header className="main-title" >{this.state.engineName}</header>
        <header className="second-title" >{this.state.engineAuthor}</header>
        <div className="game">
          <div>
            <Board
              position={current.position}
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
        this.handleEngineMove(msgTokens.slice(1));
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

  handleEngineMove(msgTokens) {
    const engMv = msgTokens[0];
    if (engMv.length !== 5) {
      logger.error(`invalid length engine move: ${engMv}`)
    }
    const from = engMv.slice(0,2)
    const to = engMv.slice(2,4)
    logger.info(`engine move from: ${from}. engine move to: ${to}.`);

    const move = this.props.chess.move({ from: engMv.slice(0,2), to: engMv.slice(2,4) })
    if (move) {
      const history = this.state.history.slice();
      this.setState({
        history: history.concat([{
          position: this.props.chess.fen(),
          move: move
        }]),
        selectedSq: null,
        ply: history.length,
        playersTurn: true,
        engineThinking: false,
      });
      return
    }
    logger.error(`invalid engine move: ${engMv}`)
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
  <Game 
    chess={Chess()}
  />,
  document.getElementById('root')
);
