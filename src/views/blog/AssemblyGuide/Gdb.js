import React from "react";
import Post from "../../../components/BlogPosts/Post";
import {
  howToUseGdb,
  postInfo,
} from "../../../data/blog/assemblyGuide/How-to-use-GDB-within-Docker-Container";

const Conditions = () => (
  <Post
    data={{ post: howToUseGdb, ...postInfo }}
    key={howToUseGdb.split(0, 10)}
  />
);

export default Conditions;
