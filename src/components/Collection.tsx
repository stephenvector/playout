import React from "react";
import { Container, Row, Column } from "@stephenvector/prefab";
import { ContentType, ContentTypeFields } from "../types";
import { useFirebaseCollection } from "../hooks";

type DataLabels = {
  label: string;
  id: string;
}[];

function getDataLabelsFromFields(contentTypeFields: ContentTypeFields) {
  const dataLabels: DataLabels = [];

  Object.keys(contentTypeFields).forEach(fieldId => {
    dataLabels.push({
      label: contentTypeFields[fieldId].name,
      id: fieldId
    });
  });

  return dataLabels;
}

interface CollectionListingProps {
  firebaseCollectionName: string;
  contentType: ContentType;
}

export default function CollectionListing(props: CollectionListingProps) {
  const { firebaseCollectionName, contentType } = props;
  const { loaded, hasError, collectionItems } = useFirebaseCollection<
    ContentType
  >(firebaseCollectionName);

  if (!loaded) {
    return (
      <Container>
        <Row>
          <Column>Loading</Column>
        </Row>
      </Container>
    );
  }

  if (hasError) {
    return (
      <Container>
        <Row>
          <Column>Something went wrong. Try refreshing the page.</Column>
        </Row>
      </Container>
    );
  }

  return (
    <Container>
      <Row>
        <Column>
          {contentType.name}

          <pre>
            <code>
              {JSON.stringify(getDataLabelsFromFields(contentType.fields))}
              {JSON.stringify(collectionItems, null, 2)}
            </code>
          </pre>
        </Column>
      </Row>
    </Container>
  );
}
