import React from "react";
import Post from "../../../components/BlogPosts/Post";
import {
  gettingStarted,
  postInfo,
} from "../../../data/blog/assemblyGuide/Getting-Started-with-Writing-Assembly-Code";

const Conditions = () => (
  <Post
    data={{ post: gettingStarted, ...postInfo }}
    key={gettingStarted.split(0, 10)}
  />
);

export default Conditions;
