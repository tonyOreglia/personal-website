import React from "react";
import Post from "../../components/BlogPosts/Post";
import { breadcrumbsPost, postInfo } from "../../data/blog/breadcrumbs";

const blogPost = () => (
  <Post
    data={{ post: breadcrumbsPost, ...postInfo }}
    key={breadcrumbsPost.split(0, 10)}
  />
);

export default blogPost;
