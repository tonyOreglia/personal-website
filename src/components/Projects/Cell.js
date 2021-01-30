import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import url from "url";

const Cell = ({ data }) => (
  <div className="cell-container">
    <article className="mini-post">
      <header>
        <h3>
          <Link to={data.link}>{data.title}</Link>
        </h3>
        <time className="published">
          {dayjs(data.date).format("MMMM, YYYY")}
        </time>
      </header>
      <Link to={data.link} className="image">
        <img src={url.resolve("./", data.image)} alt={data.title} />
      </Link>
      <div className="description">
        <p>{data.desc}</p>
      </div>
    </article>
  </div>
);

Cell.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
  }).isRequired,
};

export default Cell;
