import React from "react";
import { Container, Row, Column } from "@stephenvector/prefab";
import PostForm from "./PostForm";
import { contentTypeContentType } from "../config";

export default function ContentTypeNew() {
  return (
    <Container>
      <Row>
        <Column>
          <PostForm
            onSubmit={() => {
              return Promise.resolve(undefined);
            }}
            initialValues={{}}
            contentType={contentTypeContentType}
          />
        </Column>
      </Row>
    </Container>
  );
}
