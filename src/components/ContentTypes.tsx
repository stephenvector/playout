import React from "react";
import { Container } from "./primitives";
import { useContentTypes } from "../hooks";
import { ContentType } from "../types";

export default function CollectionListing() {
  const { documents } = useContentTypes<ContentType>();

  return (
    <Container>
      <h1>Content Type</h1>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Fields</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(documents).map((collectionItemId: string) => {
            return (
              <tr key={collectionItemId}>
                <td>
                  {documents[collectionItemId].name ? (
                    documents[collectionItemId].name
                  ) : (
                    <em>{collectionItemId}</em>
                  )}
                </td>
                <td>{collectionItemId}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Container>
  );
}
