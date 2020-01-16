import React from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import Main from '../../layouts/Main';
import { home } from '../../data/assemblyGuide/Home';

// Make all hrefs react router links
const LinkRenderer = ({ ...children }) => <Link {...children} />;

const About = () => (
  <Main>
    <article className="post" id="index">
      <header>
        <div className="title">
          <h2><Link to="/assembly">Mac Assembly Language Guide</Link></h2>
          <p>Contents</p>
        </div>
      </header>
      <ReactMarkdown
        source={home}
        renderers={{
          Link: LinkRenderer,
        }}
        escapeHtml={false}
      />
    </article>
  </Main>
);

export default About;
