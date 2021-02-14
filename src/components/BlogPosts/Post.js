import React from "react";
import { Link } from "react-router-dom";
import Helmet from "react-helmet";
import Main from "../../layouts/Main";
import ReactMarkdown from "react-markdown";
import PropTypes from "prop-types";
import icon from "../../images/me_face.jpg";

// Make all hrefs react router links
function RouterLink(props) {
  return props.href.match(/^(https?:)?\/\//) ? (
    <a href={props.href}>{props.children}</a>
  ) : (
    <Link to={props.href}>{props.children}</Link>
  );
}

const Post = ({ data }) => {
  window.scrollTo(0, 0);
  return (
    <Main>
      <Helmet title="BlogPost" />
      <article className="blogpost" id="post">
        <header>
          <div className="title">
            <h2>
              <Link to={data.link}>{data.title}</Link>
            </h2>
          </div>
          <div className="meta">
            <time className="published">{data.date}</time>
            <Link to="/contact" className="author">
              <span className="name">{data.author}</span>
              <img src={icon} alt="" />
            </Link>
          </div>
        </header>
        <span className="image featured">
          <img src={data.blogIcon} alt="" />
        </span>
        <ReactMarkdown
          source={data.post}
          renderers={{
            link: RouterLink,
          }}
          escapeHtml={false}
        />
        <footer>
          <ul className="stats">
            <li>
              <Link to={data.link}>Back to top</Link>
            </li>
          </ul>
        </footer>
      </article>
    </Main>
  );
};

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
