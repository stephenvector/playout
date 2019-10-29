import React from "react";
import { useParams } from "react-router-dom";
import { Container } from "./primitives";
import { contentTypeContentType } from "../config";
import { useContentType } from "../hooks";
import ErrorMessage from "./ErrorMessage";
import PostForm from "./PostForm";
import Loading from "./Loading";

export default function ContentTypeEdit() {
  const routeParams = useParams<{ contentTypeId: string }>();

  if (!routeParams) {
    throw Error("Not used as <Route /> component!");
  }

  const { hasError, hasLoaded, isEmpty, documents } = useContentType(
    routeParams.contentTypeId
  );

  if (!hasLoaded) {
    return <Loading />;
  }

  if (hasError) {
    return <ErrorMessage>{`Something went wrong :(`}</ErrorMessage>;
  }

  if (!isEmpty) {
    return <ErrorMessage>{`Content Type Not Found`}</ErrorMessage>;
  }

  return (
    <Container>
      <h1>Edit Content Type</h1>
      <PostForm
        onSubmit={() => {
          return Promise.resolve(undefined);
        }}
        initialValues={documents[routeParams.contentTypeId]}
        contentType={contentTypeContentType}
      />
    </Container>
  );
}
