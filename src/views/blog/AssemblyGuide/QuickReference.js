import React from "react";
import Post from "../../../components/BlogPosts/Post";
import {
  quickReference,
  postInfo,
} from "../../../data/blog/assemblyGuide/Quick-Reference:-x86-64-Assembly-&-GDB";

const Conditions = () => (
  <Post
    data={{ post: quickReference, ...postInfo }}
    key={quickReference.split(0, 10)}
  />
);

export default Conditions;
