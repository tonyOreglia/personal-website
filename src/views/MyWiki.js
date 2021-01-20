import React from "react";
import Helmet from "react-helmet";
import Main from "../layouts/Main";

const MyWiki = () => {
  return (
    <Main>
      <Helmet title="Contact" />
      <article className="post" id="contact">
        <iframe
          title="mywiki"
          width="100%"
          height="1000"
          src="https://tonyoreglia.github.io/public-tiddlywiki/"
        ></iframe>
      </article>
    </Main>
  );
};

export default MyWiki;
