import React, { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FormApi } from "final-form";
import PostForm from "./PostForm";
import { ContentType, PostValues } from "../types";
import { useContentType } from "../hooks";
import { Container } from "./primitives";

interface PostNewProps {
  firebaseCollectionName: string;
  contentType: ContentType;
}

export default function PostNew(props: PostNewProps) {
  const { contentTypeId } = useParams<{ contentTypeId: string }>();
  const { documents, isEmpty, hasError, hasLoaded } = useContentType<
    ContentType
  >(contentTypeId);

  async function handleSubmit(values: PostValues, form: FormApi<PostValues>) {
    return undefined;
  }

  return (
    <Container>
      <h1>New Post</h1>

      <PostForm<PostValues>
        onSubmit={handleSubmit}
        initialValues={{}}
        contentType={documents[contentTypeId]}
      />
    </Container>
  );
}
