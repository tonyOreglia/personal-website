import React from "react";
import Post from "../../../components/BlogPosts/Post";
import {
  printing,
  postInfo,
} from "../../../data/blog/assemblyGuide/x86-64-Linux-Assembly-Part-1:-Printing-Command-Line-Arguments";

const Conditions = () => (
  <Post data={{ post: printing, ...postInfo }} key={printing.split(0, 10)} />
);

export default Conditions;
