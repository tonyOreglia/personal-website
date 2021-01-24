import React from "react";
import { Link } from "react-router-dom";
import Helmet from "react-helmet";
import Header from "../../Template/Header";
import ReactMarkdown from "react-markdown";
import PropTypes from "prop-types";
import icon from "../../images/me_face.jpg";

// Make all hrefs react router links
const LinkRenderer = ({ ...children }) => <Link {...children} />;

const Post = ({ data }) => (
  <div id="wrapper">
    <Helmet titleTemplate="%s | Tony Oreglia" defaultTitle="Tony Oreglia" />
    <Header />
    <body class="single is-preload">
      <div id="wrapper">
        <div id="main">
          <article class="post">
            <header>
              <div className="title">
                <h2>
                  <Link to="/blog">{data.title}</Link>
                </h2>
              </div>
              <div class="meta">
                <time class="published">{data.date}</time>
                <a href="/contact" class="author">
                  <span class="name">{data.author}</span>
                  <img src={icon} alt="" />
                </a>
              </div>
            </header>
            <span class="image featured">
              <img src={data.blogIcon} alt="" />
            </span>
            <ReactMarkdown
              source={data.post}
              renderers={{
                Link: LinkRenderer,
              }}
              escapeHtml={false}
            />
            <footer>
              <ul class="stats">
                <li>
                  <a href="/dynamicip">Back to top</a>
                </li>
              </ul>
            </footer>
          </article>
        </div>
      </div>
    </body>
  </div>
);

Post.propTypes = {
  data: PropTypes.shape({
    post: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    link: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    author: PropTypes.string.isRequired,
    blogIcon: PropTypes.string,
  }).isRequired,
};

export default Post;
