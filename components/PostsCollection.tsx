import React from "react";
import { useContentTypes, useContentTypePosts } from "../hooks";

type PostsCollectionType = {
  contentTypeId: string;
};

export default function PostsCollection(props: PostsCollectionType) {
  const posts = useContentTypePosts(props.contentTypeId);
  const contentTypes = useContentTypes();

  return <div>{JSON.stringify({ posts, contentTypes }, null, 2)}</div>;
}
