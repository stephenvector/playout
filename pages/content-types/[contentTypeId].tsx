import React from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import { FORM_ERROR } from "final-form";
import { Container } from "@stephenvector/prefab";
import { contentTypeContentType } from "../../config";
import { useContentType } from "../../hooks";
import PostForm from "../../components/PostForm";
import Loading from "../../components/Loading";
import { ContentType } from "../../types";

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
  const { loaded, contentType, notFound } = useContentType(contentTypeId);

  if (notFound) {
    return <div>Content Type Not Found</div>;
  }

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
