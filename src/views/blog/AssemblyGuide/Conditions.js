import React from "react";
import Post from "../../../components/BlogPosts/Post";
import {
  conditionsAndLooping,
  postInfo,
} from "../../../data/blog/assemblyGuide/Part-3:-Conditionals-&-Looping";

const Conditions = () => (
  <Post
    data={{ post: conditionsAndLooping, ...postInfo }}
    key={conditionsAndLooping.split(0, 10)}
  />
);

export default Conditions;
