import React from "react";
import Post from "../../components/BlogPosts/Post";
import { dockerPostgres, postInfo } from "../../data/blog/dockerPostgres";

const blogPost = () => (
  <Post
    data={{ post: dockerPostgres, ...postInfo }}
    key={dockerPostgres.split(0, 10)}
  />
);

export default blogPost;
