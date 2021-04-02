import React from "react";
import Post from "../../components/BlogPosts/Post";
import { babelRoulettePost, postInfo } from "../../data/blog/babelRoulette";

const blogPost = () => (
  <Post
    data={{ post: babelRoulettePost, ...postInfo }}
    key={babelRoulettePost.split(0, 10)}
  />
);

export default blogPost;
