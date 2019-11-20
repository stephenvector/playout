import React from "react";
import { FormApi, SubmissionErrors } from "final-form";
import { Form } from "react-final-form";
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
        <div className="PostForm">
          <form autoComplete="off" onSubmit={handleSubmit}>
            {Object.keys(contentType.fields).map(fieldId => (
              <RenderField
                key={fieldId}
                field={contentType.fields[fieldId]}
                id={fieldId}
                disabled={formState.submitting}
              />
            ))}

            <p>
              <Button
                disabled={formState.invalid || formState.submitting}
                type="submit"
              >
                Save
              </Button>
            </p>
          </form>
        );
      }}
    </Form>
  );
}
