import React from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import PropTypes from "prop-types";
import Main from "../../layouts/Main";

// Make all hrefs react router links
const LinkRenderer = ({ ...children }) => <Link {...children} />;

const Post = ({ data }) => (
  <Main>
    <article className="post" id="index">
      <header>
        <div className="title">
          <h2>
            <Link to="/blog">Blog Posts</Link>
          </h2>
        </div>
      </header>
      <ReactMarkdown
        source={data.post}
        renderers={{
          Link: LinkRenderer,
        }}
        escapeHtml={false}
      />
    </article>
  </Main>
);

Post.propTypes = {
  data: PropTypes.shape({
    post: PropTypes.string.isRequired,
  }).isRequired,
};

export default Post;
