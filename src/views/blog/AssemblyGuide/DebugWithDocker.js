import React from "react";
import Post from "../../../components/BlogPosts/Post";

import {
  debugWithDocker,
  postInfo,
} from "../../../data/blog/assemblyGuide/Using-Docker-to-Compile,-Link,-Run-and-Debug-Assembly-Language-Code";

const Conditions = () => (
  <Post
    data={{ post: debugWithDocker, ...postInfo }}
    key={debugWithDocker.split(0, 10)}
  />
);

export default Conditions;
