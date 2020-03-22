import React from "react";
import { FormApi, SubmissionErrors } from "final-form";
import { Form } from "react-final-form";
import { Button } from "@stephenvector/prefab";
import { ContentType } from "../types";
import RenderField from "./RenderField";

type PostFormProps<T> = {
  initialValues: T;
  contentType: ContentType;
  onSubmit(values: T, form: FormApi<T>): Promise<SubmissionErrors | undefined>;
};

export default function PostForm<T>({
  initialValues,
  contentType,
  onSubmit
}: PostFormProps<T>) {
  return (
    <Form initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleSubmit, form }) => (
        <form autoComplete="off" onSubmit={handleSubmit}>
{Object.keys(contentType.fields).map(fieldId => (
      <RenderField
        key={fieldId}
        field={contentType.fields[fieldId]}
        id={fieldId}
      />
    ))}

      <Button
        type="submit"
     >
        Save
      </Button>
        </form>
      )}
    </Form>
  );
}
