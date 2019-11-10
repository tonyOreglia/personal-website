import React from 'react';
import { Link } from 'react-router-dom';

import Main from '../layouts/Main';
import Chess from 'chess.js';

import '../ChessGame/index.css';
import Game from "../ChessGame/game";

const Index = () => (
  <Main>
    <article className="post" id="index">
      <header>
        <div className="title">
          <h2><Link to="/">GLEE</Link></h2>
          <p>Golang Chess Engine. Frontend build modularly with React.</p>
        </div>
      </header>
      <p> 
        {/* Welcome to my website. Please feel free to read more <Link to="/about">about me</Link>,
        or you can check out my {' '}
        <Link to="/projects">projects</Link>, {' '}
        view <Link to="/stats">site statistics</Link>, {' '}
        or <Link to="/contact">contact</Link> me. */}
        <Game chess={Chess()}/>
      </p>
      <p> Chess Engine Source available <a href="https://github.com/tonyOreglia/glee">here</a>.</p>
      <p> React Board Source available <a href="https://github.com/tonyOreglia/chess-board-react">here</a>.</p>
    </article>
  </Main>
);

export default Index;
