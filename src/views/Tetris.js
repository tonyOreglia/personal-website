import React from "react";
import Helmet from "react-helmet";
import Main from "../layouts/Main";

const Tetris = () => {
  return (
    <Main>
      <article className="post" id="tetris">
        <Helmet title="Tetris" />
        <iframe
          title="tetris"
          width="100%"
          height="1000"
          src="https://tonyoreglia.github.io/tetris-p5/"
        ></iframe>
      </article>
    </Main>
  );
};

export default Tetris;
