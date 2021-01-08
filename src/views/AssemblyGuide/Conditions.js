import React from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import Main from '../../layouts/Main';
import { conditionsAndLooping } from '../../data/blog/assemblyGuide/Part-3:-Conditionals-&-Looping';

// Make all hrefs react router links
const LinkRenderer = ({ ...children }) => <Link {...children} />;

const About = () => (
  <Main>
    <article className="post" id="index">
      <header>
        <div className="title">
          <h2><Link to="/assembly">TONY'S GUIDE TO WRITING X86-64 ASSEMBLY LANGUAGE</Link></h2>
          <p>Contents</p>
        </div>
      </header>
      <ReactMarkdown
        source={conditionsAndLooping}
        renderers={{
          Link: LinkRenderer,
        }}
        escapeHtml={false}
      />
    </article>
  </Main>
);

export default About;
