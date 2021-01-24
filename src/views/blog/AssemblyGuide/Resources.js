import React from "react";
import Post from "../../../components/BlogPosts/Post";
import {
  resources,
  postInfo,
} from "../../../data/blog/assemblyGuide/Resources";

const Conditions = () => (
  <Post data={{ post: resources, ...postInfo }} key={resources.split(0, 10)} />
);

export default Conditions;
