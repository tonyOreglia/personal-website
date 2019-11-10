import ReactDOM from 'react-dom';
// import { Link } from 'react-router-dom';
import {
  Link, BrowserRouter as Router, Switch, Route,
} from 'react-router-dom';
import Chess from 'chess.js';
import React from 'react';
import About from './views/About';
import Contact from './views/Contact';
import Projects from './views/Projects';
import Glee from './views/Glee';
import NotFound from './views/NotFound';
import Main from './layouts/Main';

// FIX: TOR - Nov 10 2019
// Chess engine CSS needs to be imported before main site CSS 
// due to name collisions. 
import './ChessGame/index.css';
import Game from "./ChessGame/game";

import './static/css/main.scss';

const Index = () => (
  <Main>
    <article className="post" id="index">
      <header>
        <div className="title">
          <h2><Link to="/">About this site</Link></h2>
          <p>A beautiful, responsive, react app written with modern Javascript.</p>
        </div>
      </header>
      <p> Welcome to my website. Please feel free to read more <Link to="/about">about me</Link>,
        or you can check out my <Link to="/chess">Chess Engine </Link>
        or <Link to="/contact">contact me</Link>.
      </p>
      <p> Source available <a href="https://github.com/tonyOreglia">here</a>.</p>
    </article>
  </Main>
);

const ChessGame = () => {
  return <Game chess={Chess()}/>
};

ReactDOM.render(
  <Router basename={'./'}>
    <Switch>
      <Route exact path="/" component={Index} />
      <Route path="/about" component={About} />
      <Route path="/projects" component={Projects} />
      <Route path="/chess" component={Glee} />
      <Route path="/contact" component={Contact} />
      <Route component={NotFound} status={404} />
    </Switch>
  </Router>,
  document.getElementById('root'),
);



// export default Index;
