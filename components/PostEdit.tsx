import React from "react";
import { FormApi, FORM_ERROR } from "final-form";
import firebase from "firebase/app";
import "firebase/firestore";
import PostForm from "./PostForm";
import { PostValues } from "../types";
import { useContentType, usePost } from "../hooks";
import { Container } from "./primitives";
import Loading from "./Loading";

interface PostEditProps {
  postId: string;
  contentTypeId: string;
}

export default function PostEdit({ contentTypeId, postId }: PostEditProps) {
  const { loaded, contentType } = useContentType(contentTypeId);
  const post = usePost(postId);

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

  if (!loaded || contentType === undefined || !post.hasLoaded) {
    return <Loading />;
  }

  // if (!contentType.hasError) {
  //   return <Loading />;
  // }

  if (!post.hasError) {
    return <Loading />;
  }

  return (
    <Container>
      <h1>Edit Post</h1>

      <PostForm<PostValues>
        onSubmit={handleSubmit}
        initialValues={post.documents[postId] as PostValues}
        contentType={contentType}
      />
    </Container>
  );
}
