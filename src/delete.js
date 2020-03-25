import React, { Component } from "react";
import {
    Route,
    NavLink,
    HashRouter
} from "react-router-dom";
import Chess from 'chess.js';
import Game from "./game";
import Nav from './Template/Nav';


function ChessGame() {
    return <Game chess={Chess()} />
}

class Main extends Component {
    render() {
        return (
            <HashRouter>
                <div id="wrapper">
                    <ul className="header">
                        <li><NavLink to="/">Home</NavLink></li>
                        <li><NavLink to="/chess">Chess App</NavLink></li>
                    </ul>
                    <div className="content">
                        <Route exact path="/" component={Nav} />
                        <Route path="/chess" component={ChessGame} />
                    </div>
                </div>
            </HashRouter>
        );
    }
}

export default Main;