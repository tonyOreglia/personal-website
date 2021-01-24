import React from "react";
import Post from "../../../components/BlogPosts/Post";
import {
  functionParams,
  postInfo,
} from "../../../data/blog/assemblyGuide/Part-2:-Sending-Function-Arguments-and-Receiving-Values-Back";

const Conditions = () => (
  <Post
    data={{ post: functionParams, ...postInfo }}
    key={functionParams.split(0, 10)}
  />
);

export default Conditions;
