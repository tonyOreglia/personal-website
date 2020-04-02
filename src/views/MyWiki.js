import React from 'react';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import Main from '../layouts/Main';

const Contact = () => {
  return (
    <Main>
      <Helmet title="Contact" />
      <article className="post" id="contact">
            <iframe className="stats" width="100%" height="1000" src="https://tonyoreglia.github.io/public-tiddlywiki/"></iframe>
      </article>
    </Main>
  );
};

export default Contact;
