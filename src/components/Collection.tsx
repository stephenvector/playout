import React from "react";
import { Container, Row, Column } from "@stephenvector/prefab";
import { useContentTypes } from "../hooks";

export default function CollectionListing() {
  const contentTypes = useContentTypes();

  return (
    <Container>
      <Row>
        <Column>
          <h1>Content Type</h1>

          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Fields</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(contentTypes).map(collectionItemId => {
                return (
                  <tr key={collectionItemId}>
                    <td>{contentTypes[collectionItemId].name}</td>
                    <td>{collectionItemId}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Column>
      </Row>
    </Container>
  );
}
