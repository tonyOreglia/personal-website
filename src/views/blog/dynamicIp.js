import React from "react";
import Post from "../../components/BlogPosts/Post";
import {
  blogPostDynamicIp,
  postInfo,
} from "../../data/blog/automateDeploymentWithCodeship";

const blogPost = () => (
  <Post
    data={{ post: blogPostDynamicIp, ...postInfo }}
    key={blogPostDynamicIp.split(0, 10)}
  />
);

export default blogPost;
