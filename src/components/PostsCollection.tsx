import React, { useState, useEffect } from "react";
import { usePosts, useContentTypes } from "../hooks";

type PostsCollectionType = {
  contentTypeId: string;
};

export default function PostsCollection(props: PostsCollectionType) {
  const posts = usePosts(props.contentTypeId);
  const contentTypes = useContentTypes();

  return <div>{JSON.stringify({ posts, contentTypes }, null, 2)}</div>;
}
