import React from "react";
import { Link } from "react-router-dom";

import Main from "../layouts/Main";
import Chess from "chess.js";

import "../ChessGame/index.css";
import Game from "../ChessGame/game";

const Index = () => (
  <Main>
    <article className="post" id="index">
      <header>
        <div className="title">
          <h2>
            <Link to="/">GLEE</Link>
          </h2>
          <p>Golang Chess Engine. Frontend built with React.</p>
        </div>
      </header>
      <p>
        <Game chess={Chess()} />
      </p>
      <p>
        {" "}
        Chess Engine Source available{" "}
        <a href="https://github.com/tonyOreglia/glee">here</a>.
      </p>
      <p>
        {" "}
        React Board Source available{" "}
        <a href="https://github.com/tonyOreglia/personal-website/tree/master/src/ChessGame">
          here
        </a>
        .
      </p>
    </article>
  </Main>
);

export default Index;
