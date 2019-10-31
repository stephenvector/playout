import React from "react";
import { FormApi, FORM_ERROR } from "final-form";
import firebase from "firebase/app";
import "firebase/firestore";
import PostForm from "./PostForm";
import { PostValues } from "../types";
import { useContentType } from "../hooks";
import { Container } from "./primitives";

interface PostNewProps {
  contentTypeId: string;
}

export default function PostNew({ contentTypeId }: PostNewProps) {
  const { contentType } = useContentType(contentTypeId);

  if (contentType === undefined) {
    return null;
  }

  async function handleSubmit(values: PostValues, form: FormApi<PostValues>) {
    try {
      await firebase
        .firestore()
        .collection("posts")
        .doc()
        .set({
          ...values,
          contentType: contentTypeId
        });
    } catch (e) {
      return { [FORM_ERROR]: "something went wrong" };
    } finally {
      return undefined;
    }
  }

  return (
    <Container>
      <h1>New Post</h1>

      <PostForm<PostValues>
        onSubmit={handleSubmit}
        initialValues={{}}
        contentType={contentType}
      />
    </Container>
  );
}
