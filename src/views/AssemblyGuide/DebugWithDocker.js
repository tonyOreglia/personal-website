import React from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import Main from "../../layouts/Main";
import { debugWithDocker } from "../../data/blog/assemblyGuide/Using-Docker-to-Compile,-Link,-Run-and-Debug-Assembly-Language-Code";

// Make all hrefs react router links
const LinkRenderer = ({ ...children }) => <Link {...children} />;

const About = () => (
  <Main>
    <article className="post" id="index">
      <header>
        <div className="title">
          <h2>
            <Link to="/assembly">
              TONY'S GUIDE TO WRITING X86-64 ASSEMBLY LANGUAGE
            </Link>
          </h2>
          <p>Contents</p>
        </div>
      </header>
      <ReactMarkdown
        source={debugWithDocker}
        renderers={{
          Link: LinkRenderer,
        }}
        escapeHtml={false}
      />
    </article>
  </Main>
);

export default About;
