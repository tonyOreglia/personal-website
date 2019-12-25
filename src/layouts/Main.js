import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import Header from '../Template/Header';
import Nav from '../Template/Nav';

class Main extends Component {
  componentWillMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div id="wrapper">
        <Helmet titleTemplate="%s | Tony Oreglia" defaultTitle="Tony Oreglia" />
        <Header />
        <div id="main">
          {this.props.children}
        </div>
        {!this.props.fullPage && <Nav />}
      </div>);
  }
}

Main.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  fullPage: PropTypes.bool,
};

Main.defaultProps = {
  children: null,
  fullPage: false,
};

export default Main;
