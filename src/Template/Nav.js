import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import icon from "../images/me_icon.jpg";

import data from "../data/contact";
class Nav extends Component {
  render() {
    return (
      <section id="sidebar">
        <section id="intro">
          <Link to="/" className="logo">
            <img src={icon} alt="" />
          </Link>
          <header>
            <h2>Tony Oreglia</h2>
            <p>
              <a href="mailto:tony.oreglia@gmail.com">tony.oreglia@gmail.com</a>
            </p>
          </header>
        </section>

        <section className="blurb">
          <h2>About</h2>
          <p>
            Hi, I&apos;m Tony. I have my bachelors in Electrical Engineering
            from <a href="https://www.ece.ucdavis.edu/">UC Davis</a> and am
            currently a Backend Engineer at{" "}
            <a href="https://www.dashlane.com/">Dashlane</a>. Before Dashlane I
            worked at <a href="https://safetyculture.com/">SafetyCulture</a> and
            before that <a href="https://www.seagate.com/pt/pt/">Seagate</a>
          </p>
          <ul className="actions"></ul>
        </section>
        <div>
          <button data-switch-dark onClick={() => this.props.toggleDarkMode()}>
            Dark Mode
          </button>
        </div>
        <section id="footer">
          <ul className="icons">
            {data.map((s) => (
              <li key={s.label}>
                <a href={s.link}>
                  <FontAwesomeIcon icon={s.icon} />
                </a>
              </li>
            ))}
          </ul>
          <p className="copyright">&copy;Tony Oreglia.</p>
        </section>
      </section>
    );
  }
}

Nav.propTypes = {
  toggleDarkMode: PropTypes.func,
};

export default Nav;
