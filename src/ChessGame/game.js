import React from "react";
import MediaQuery from "react-responsive";
import { websocketConnect } from "./websocket";
import { indexToAlgebraic } from "./chess/chess";
import config from "./config";
import Board from "./board";
import TakenPieces from "./taken-pieces";

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          position: this.props.chess.fen(),
          move: "",
          takenPieces: [],
        },
      ],
      ply: 0,
      selectedSq: null,
      engineName: "",
      engineAuthor: "",
      uciOK: false,
      isReady: false,
      engineThinking: false,
      playersTurn: true,
      playerColor: config.WHITE,
      takenPieces: [],
      fenInputOpen: false,
    };
    this.ws = websocketConnect(config.gleeUri);
    this.ws.onmessage = (event) => {
      const msg = event.data;
      this.processEngineMessage(msg);
    };
  }

  jumpTo(step) {
    this.setState({
      ply: step,
    });
  }

  startNewGameFen = (fen) => {
    if (!this.props.chess.load(fen)) {
      alert("invalid fen position");
      return;
    }
    let playersTurn = false;
    let engineThinking = true;
    let playerColor = config.WHITE;
    if (this.props.chess.turn() === config.WHITE) {
      playerColor = config.BLACK;
    }
    this.setState({
      history: [
        {
          position: fen,
          move: "",
          takenPieces: [],
        },
      ],
      ply: 0,
      selectedSq: null,
      isReady: false,
      engineThinking,
      playersTurn,
      playerColor,
      takenPieces: [],
    });
    this.ws.send("ucinewgame");
    this.ws.send("isready");
    this.ws.send(`position ${this.props.chess.fen()}`);
    this.ws.send("go");
  };

  startNewGameAsBlack = () => {
    this.startNewGame(config.BLACK);
  };

  startNewGameAsWhite = () => {
    this.startNewGame(config.WHITE);
  };

  startNewGame = (humanColor) => {
    let playersTurn = false;
    let engineThinking = true;
    if (humanColor === config.WHITE) {
      playersTurn = true;
      engineThinking = false;
    }
    this.props.chess.reset();
    this.setState({
      history: [
        {
          position: this.props.chess.fen(),
          move: "",
          takenPieces: [],
        },
      ],
      ply: 0,
      selectedSq: null,
      isReady: false,
      engineThinking,
      playersTurn,
      playerColor: humanColor,
      takenPieces: [],
    });
    this.ws.send("ucinewgame");
    this.ws.send("isready");
    this.ws.send(`position ${this.props.chess.fen()}`);
    if (humanColor === config.BLACK) {
      this.ws.send("go");
    }
  };

  handleClick(i) {
    // unset the selected square if it's reclicked or
    // it's not the players turn
    if (i === this.state.selectedSq || !this.state.playersTurn) {
      this.setState({
        selectedSq: null,
      });
      return;
    }

    // if no sq already selected, just highlight the clicked sq
    if (this.state.selectedSq === null) {
      this.setState({
        selectedSq: i,
      });
      return;
    }

    const from = indexToAlgebraic(this.state.selectedSq);
    const to = indexToAlgebraic(i);
    const takenPiece = this.props.chess.get(to);
    const movingPiece = this.props.chess.get(from);
    let promotion = "";
    if (movingPiece && movingPiece.type === "p" && (i < 8 || i > 55)) {
      promotion = "q";
    }
    let moveInfo = { from, to };
    if (promotion !== "") {
      moveInfo = { ...moveInfo, promotion };
    }
    const move = this.props.chess.move(moveInfo);
    if (move) {
      this.updateTakenPieces(takenPiece);
      const history = this.state.history.slice();
      this.setState({
        history: history.concat([
          {
            position: this.props.chess.fen(),
            move: move,
            takenPieces: this.state.takenPieces.slice(),
          },
        ]),
        selectedSq: null,
        ply: history.length,
        playersTurn: false,
        engineThinking: true,
      });
      // tell engine that move has been made
      this.ws.send(`position ${this.props.chess.fen()}`);
      // tell engine to think of a move!
      this.ws.send(`go`);
      return;
    }

    this.setState({
      selectedSq: i,
    });
  }

  updateTakenPieces = (takenPiece) => {
    if (takenPiece !== null) {
      const takenPieces = this.state.takenPieces.concat(takenPiece);
      this.setState({
        takenPieces,
      });
    }
  };

  returnToPreviousMove = (i) => {
    const newHistory = this.state.history.slice(0, i + 1);
    this.props.chess.load(this.state.history[i].position);
    const takenPieces = this.state.history[i].takenPieces;
    this.setState({
      history: newHistory,
      selectedSq: null,
      ply: newHistory.length - 1,
      playersTurn: this.props.chess.turn() === this.state.playerColor,
      engineThinking: !(this.props.chess.turn() === this.state.playerColor),
      takenPieces,
    });
    this.ws.send("isready");
    this.ws.send(`position ${this.props.chess.fen()}`);
    if (!(this.props.chess.turn() === this.state.playerColor)) {
      this.ws.send("go");
    }
  };

  gameHistory = () => {
    let moves = [];
    this.state.history.forEach((position, i, history) => {
      if (i % 2 === 0 || i === 0) {
        return;
      }
      if (i === history.length - 1) {
        moves.push(
          <div className="button_cont" key={i}>
            <button
              className="button button-move"
              key={i * 2}
              onClick={() => this.returnToPreviousMove(i)}
            >{`${position.move.from}, ${position.move.to}`}</button>
          </div>
        );
        return;
      }
      moves.push(
        <div className="button_cont" key={i}>
          <button
            className="button button-move"
            key={i * 2}
            onClick={() => this.returnToPreviousMove(i)}
          >{`${position.move.from}, ${position.move.to}`}</button>
          <button
            className="button button-move"
            key={i * 2 + 1}
            onClick={() => this.returnToPreviousMove(i + 1)}
          >{`${history[i + 1].move.from}, ${history[i + 1].move.to}`}</button>
        </div>
      );
    });
    return moves;
  };

  fenInput = () => {
    const keyPress = (e) => {
      if (e.keyCode === 13) {
        this.setState({ fenInputOpen: false });
        this.startNewGameFen(e.target.value);
      }
    };

    return (
      <input
        placeholder="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
        className="input"
        onKeyDown={keyPress}
      />
    );
  };

  renderDesktop = (current) => {
    return (
      <div>
        <header className="main-title">
          {this.state.engineName
            ? `Running ${this.state.engineName}`
            : "Attempting to connect with chess engine..."}
        </header>
        <header className="second-title">{`Created by ${this.state.engineAuthor}`}</header>
        <div className="game">
          <Board
            position={current.position}
            onClick={(i) => this.handleClick(i)}
            selected={this.state.selectedSq}
          />
          <div className="game-info">
            <button
              className="button button-newgame"
              onClick={this.startNewGameAsWhite}
            >
              {"Play as White"}
            </button>
            <button
              className="button button-newgame"
              onClick={this.startNewGameAsBlack}
            >
              {"Play as Black"}
            </button>
            {this.state.fenInputOpen ? (
              this.fenInput()
            ) : (
              <button
                className="button button-newgame"
                onClick={() => this.setState({ fenInputOpen: true })}
              >
                {"Set position using FEN notation"}
              </button>
            )}
            {this.gameHistory()}
          </div>
          <div className="second-title">
            <TakenPieces takenPieces={this.state.takenPieces} />
          </div>
        </div>
      </div>
    );
  };

  renderMobile = (current) => {
    return (
      <div>
        <header className="main-title">
          {this.state.engineName
            ? `Running Golang Chess Engine`
            : "Attempting to connect with chess computer..."}
        </header>
        <header className="second-title">{`Created by ${this.state.engineAuthor}`}</header>
        <div className="game">
          <Board
            position={current.position}
            onClick={(i) => this.handleClick(i)}
            selected={this.state.selectedSq}
          />
        </div>
        <div className="game-mobile">
          <button
            className="button button-newgame"
            onClick={this.startNewGameAsWhite}
          >
            {"Play as White"}
          </button>
          <button
            className="button button-newgame"
            onClick={this.startNewGameAsBlack}
          >
            {"Play as Black"}
          </button>
          {this.state.fenInputOpen ? (
            this.fenInput()
          ) : (
            <button
              className="button button-newgame"
              onClick={() => this.setState({ fenInputOpen: true })}
            >
              {"Set position using FEN notation"}
            </button>
          )}
          {this.gameHistory()}
        </div>
      </div>
    );
  };

  render() {
    return (
      <MediaQuery maxDeviceWidth={900}>
        {(matches) => {
          if (matches) {
            return this.renderMobile(this.state.history[this.state.ply]);
          }
          return this.renderDesktop(this.state.history[this.state.ply]);
        }}
      </MediaQuery>
    );
  }

  processEngineMessage(msg) {
    const msgTokens = msg.split(" ");
    switch (msgTokens[0]) {
      case "id":
        config.logger.info("engine reporting id");
        this.processId(msgTokens.slice(1));
        break;
      case "uciok":
        config.logger.info(`revieved uciok`);
        this.setState({
          uciOK: true,
        });
        break;
      case "readyok":
        config.logger.info(`revieved readyok`);
        this.setState({
          isReady: true,
        });
        break;
      case "bestmove":
        this.handleEngineMove(msgTokens.slice(1));
        break;
      case "copyprotection":
        break;
      case "registration":
        break;
      case "info":
        config.logger.info(`processing info: ${msgTokens.join(" ")}`);
        break;
      case "option":
        config.logger.info(`command: ${msgTokens[0]} is not yet handled.`);
        break;
      default:
        config.logger.info(`command: ${msgTokens[0]} is not yet handled.`);
    }
  }

  handleEngineMove(msgTokens) {
    let engMv = msgTokens[0];
    if (engMv.length !== 5 && engMv.length !== 6) {
      config.logger.error(`invalid length engine move: ${engMv}`);
      return;
    }
    engMv = engMv.slice(0, engMv.length - 1);
    const from = engMv.slice(0, 2);
    const to = engMv.slice(2, 4);
    const takenPiece = this.props.chess.get(to);
    config.logger.info(`engine move from: ${from}. engine move to: ${to}.`);
    const move = this.props.chess.move(engMv, { sloppy: true });
    if (move) {
      this.updateTakenPieces(takenPiece);
      const history = this.state.history.slice();
      this.setState({
        history: history.concat([
          {
            position: this.props.chess.fen(),
            move: move,
            takenPieces: this.state.takenPieces.slice(),
          },
        ]),
        selectedSq: null,
        ply: history.length,
        playersTurn: true,
        engineThinking: false,
      });
      return;
    }
    config.logger.error(`invalid engine move: ${engMv}`);
  }

  processId(msgTokens) {
    switch (msgTokens[0]) {
      case "name":
        config.logger.info("engine reporting id name");
        if (msgTokens.length < 2) {
          config.logger.error(
            `unhandled message: ${JSON.stringify(msgTokens)}`
          );
          break;
        }
        this.setState({
          engineName: `${msgTokens.slice(1).join(" ")}`,
        });
        break;
      case "author":
        config.logger.info("engine reporting id author");
        if (msgTokens.length < 2) {
          config.logger.error(
            `unhandled message: ${JSON.stringify(msgTokens)}`
          );
          break;
        }
        this.setState({
          engineAuthor: `${msgTokens.slice(1).join(" ")}`,
        });
        break;
      default:
        config.logger.error(`unrecognized id: ${msgTokens}`);
    }
  }
}
