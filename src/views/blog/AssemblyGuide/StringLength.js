import React from "react";
import Post from "../../../components/BlogPosts/Post";
import {
  stringLength,
  postInfo,
} from "../../../data/blog/assemblyGuide/Part-4:-How-to-Calculate-String-Length";

const Conditions = () => (
  <Post
    data={{ post: stringLength, ...postInfo }}
    key={stringLength.split(0, 10)}
  />
);

export default Conditions;
