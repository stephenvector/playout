import React from "react";
import { Link } from "react-router-dom";
import { Container } from "./primitives";
import { useContentTypes } from "../hooks";

export default function ContentTypes() {
  const { contentTypes } = useContentTypes();

  if (contentTypes === undefined) {
    return null;
  }

  return (
    <Container>
      <h1>Content Types</h1>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Fields</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(contentTypes).map((collectionItemId: string) => {
            return (
              <tr key={collectionItemId}>
                <td>
                  <Link to={`/content-types/${collectionItemId}`}>
                    {contentTypes[collectionItemId].name ? (
                      contentTypes[collectionItemId].name
                    ) : (
                      <em>{collectionItemId}</em>
                    )}
                  </Link>
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
