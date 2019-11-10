import React from 'react';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Main from '../layouts/Main';
import data from '../data/contact';

const Contact = () => {
  return (
    <Main>
      <Helmet title="Contact" />
      <article className="post" id="contact">
        <header>
          <div className="title">
            <h2><Link to="/contact">Contact</Link></h2>
          </div>
        </header>
        <div className="email-at">
          <p>Feel free to get in touch. You can email me at <p><a href="mailto:tony.oreglia@gmail.com">tony.oreglia@gmail.com</a></p></p>
        </div>
        <ul className="icons">
          {data.map((s) => (
            <li key={s.label}>
              <a href={s.link}>
                <FontAwesomeIcon icon={s.icon} />
              </a>
            </li>
          ))}
        </ul>
      </article>
    </Main>
  );
};

export default Contact;
