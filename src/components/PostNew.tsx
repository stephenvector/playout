import React, { useCallback } from "react";
import { FormApi, FORM_ERROR, SubmissionErrors } from "final-form";
import PostForm from "./PostForm";
import { ContentType, PostValues } from "../types";
// import { useFirebaseSetDocument } from "../hooks";
import { Container, Row, Column, H1 } from "@stephenvector/prefab";

interface PostNewProps {
  firebaseCollectionName: string;
  contentType: ContentType;
}

export default function PostNew(props: PostNewProps) {
  const { contentType } = props;

  const handleSubmit = useCallback(
    async (values: PostValues, form: FormApi<PostValues>) => {
      return Promise.resolve(undefined);
    },
    []
  );

  return (
    <Container>
      <Row>
        <Column>
          <H1>Dashboard</H1>

          <PostForm<PostValues>
            onSubmit={handleSubmit}
            initialValues={{}}
            contentType={contentType}
          />
        </Column>
      </Row>
    </Container>
  );
}
