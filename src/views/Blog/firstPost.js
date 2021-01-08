import React from 'react';
import Post from '../../components/BlogPosts/Post';
import { firstPost } from '../../data/blog/firstPost';

const blogPost = () => (
  <Post
    data={{ post: firstPost }}
    key={firstPost.split(0,10)}
  />
);

export default blogPost;
