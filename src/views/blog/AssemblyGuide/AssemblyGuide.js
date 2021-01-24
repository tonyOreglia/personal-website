import React from "react";
import Post from "../../../components/BlogPosts/Post";
import { home, postInfo } from "../../../data/blog/assemblyGuide/Home";

const About = () => (
  <Post data={{ post: home, ...postInfo }} key={home.split(0, 10)} />
);

export default About;
