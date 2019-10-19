import React, { useCallback, useState } from "react";
import { FormApi, SubmissionErrors, FORM_ERROR } from "final-form";
import firebase from "firebase/app";
import "firebase/firestore";
import PostForm from "./PostForm";
import { ContentType, contentTypeContentType } from "../config";

export default function ContentTypeNew() {
  const [initialValues] = useState<ContentType>(() => {
    console.log("what");
    return {
      name: "",
      fields: [
        {
          id: firebase
            .firestore()
            .collection("randomcollection")
            .doc().id,
          name: "Name",
          type: "text"
        }
      ]
    };
  });

  const handleSubmit = useCallback(
    async (values: ContentType, form: FormApi<ContentType>) => {
      try {
        const doc = firebase
          .firestore()
          .collection("content-types")
          .doc();
        await doc.set(values);
        return Promise.resolve(undefined);
      } catch (e) {
        return {
          [FORM_ERROR]: "Something went wrong!"
        };
      } finally {
        return undefined;
      }
    },
    []
  );

  return (
    <PostForm
      onSubmit={handleSubmit}
      initialValues={initialValues}
      contentType={contentTypeContentType}
    />
  );
}
