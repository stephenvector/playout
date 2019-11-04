import React from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import { FORM_ERROR } from "final-form";
import { Container } from "./primitives";
import { contentTypeContentType } from "../config";
import { useContentType } from "../hooks";
import PostForm from "./PostForm";
import Loading from "./Loading";
import { ContentType } from "../types";

type ContentTypeEditProps = {
  contentTypeId: string;
};

async function updateContentType(contentTypeId: string, values: ContentType) {
  try {
    await firebase
      .firestore()
      .collection("content-types")
      .doc(contentTypeId)
      .set(values);
  } catch (e) {
    return { [FORM_ERROR]: "Something went wrong." };
  }
}

export default function ContentTypeEdit({
  contentTypeId
}: ContentTypeEditProps) {
  const { loaded, contentType } = useContentType(contentTypeId);

  if (!loaded || contentType === undefined) {
    return <Loading />;
  }

  return (
    <Container>
      <h1>Edit Content Type</h1>
      <PostForm<ContentType>
        onSubmit={values => updateContentType(contentTypeId, values)}
        initialValues={contentType}
        contentType={contentTypeContentType}
      />
    </Container>
  );
}
