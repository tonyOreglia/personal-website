import React from "react";
import Helmet from "react-helmet";
import Main from "../layouts/Main";

const Snake = () => {
  return (
    <Main>
      <Helmet title="Snake" />
      <article className="post" id="Snake">
        <iframe
          title="Snake"
          width="100%"
          height="1000"
          src="https://tonyoreglia.github.io/snake-p5/"
        ></iframe>
      </article>
    </Main>
  );
};

export default Snake;
