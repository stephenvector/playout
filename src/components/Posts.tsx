import React from "react";
import { Link } from "react-router-dom";
import { useContentType, useContentTypePosts } from "../hooks";
import { Container } from "./primitives";
import { PostValues } from "../types";
import { getLabelsFromContentType } from "../utils";

type PostProps = {
  contentTypeId: string;
};

export default function Posts({ contentTypeId }: PostProps) {
  const { contentType, loaded } = useContentType(contentTypeId);
  const posts = useContentTypePosts<PostValues>(contentTypeId);

  if (contentType === undefined || !loaded) {
    return <span>loading</span>;
  }

  return (
    <Container>
      <h1>{contentType.name}</h1>

      <table>
        <thead>
          <tr>{/* content type field labels will go here */}</tr>
        </thead>
        <tbody>
          {Object.keys(posts.documents).map(docId => {
            return (
              <tr key={docId}>
                <td>
                  <Link to={`/posts/${contentTypeId}/${docId}`}>
                    {posts.documents[docId].name ? (
                      posts.documents[docId].name
                    ) : (
                      <em>{docId}</em>
                    )}
                  </Link>
                </td>
                <td>{docId}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Container>
  );
}
