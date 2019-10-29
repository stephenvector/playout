import React from "react";
import { Container } from "./primitives";
import PostForm from "./PostForm";
import { contentTypeContentType } from "../config";

export default function ContentTypeNew() {
  return (
    <Container>
      <h1>Create A New Content Type</h1>
      <PostForm
        onSubmit={() => {
          return Promise.resolve(undefined);
        }}
        initialValues={{}}
        contentType={contentTypeContentType}
      />
    </Container>
  );
}
