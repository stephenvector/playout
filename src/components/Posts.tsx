import React from "react";
import { useParams } from "react-router-dom";
import { useContentTypePosts } from "../hooks";
import { Container } from "./primitives";
import { PostValues } from "../types";

export default function Posts() {
  const { contentTypeId } = useParams<{ contentTypeId: string }>();
  const { documents } = useContentTypePosts<PostValues>(contentTypeId);

  return (
    <Container>
      <h1>Posts</h1>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Fields</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(documents).map(docId => {
            return (
              <tr key={docId}>
                <td>
                  {documents[docId].name ? (
                    documents[docId].name
                  ) : (
                    <em>{docId}</em>
                  )}
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
