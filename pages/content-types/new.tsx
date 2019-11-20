import React from "react";
import firebase from "firebase";
import "firebase/firestore";
import { FORM_ERROR } from "final-form";
import { H1 } from "@stephenvector/prefab";
import PostForm from "../../components/PostForm";
import { contentTypeContentType } from "../../config";
import { ContentType } from "../../types";

const INITIAL_STATE: ContentType = {
  name: "",
  fields: {}
};

async function createContentType(values: ContentType) {
  try {
    await firebase
      .firestore()
      .collection("content-types")
      .doc()
      .set(values);
  } catch (e) {
    return { [FORM_ERROR]: "Something went wrong." };
  }
}

export default function ContentTypeNew() {
  return (
    <>
      <H1>Create A New Content Type</H1>
      <PostForm
        onSubmit={createContentType}
        initialValues={INITIAL_STATE}
        contentType={contentTypeContentType}
      />
    </>
  );
}
