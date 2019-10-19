import React from "react";
import { FormApi, SubmissionErrors } from "final-form";
import { Form } from "react-final-form";
import arrayMutators from "final-form-arrays";
import { ContentType, ContentTypeField } from "../types";
import RenderField from "./RenderField";

type PostFormProps<T> = {
  initialValues: T;
  contentType: ContentType;
  onSubmit(values: T, form: FormApi<T>): Promise<SubmissionErrors | undefined>;
};

export default function PostForm<T = {}>({
  initialValues,
  contentType,
  onSubmit
}: PostFormProps<T>) {
  return (
    <Form<T>
      initialValues={initialValues}
      mutators={{ ...arrayMutators }}
      onSubmit={onSubmit}
    >
      {({ handleSubmit, form }) => (
        <div className="PostForm">
          <form autoComplete="off" onSubmit={handleSubmit}>
            {contentType.fields.map((field: ContentTypeField) => (
              <RenderField field={field} key={field.id} />
            ))}

            <p>
              <button type="submit">Save</button>
            </p>
          </form>
          <pre>
            <code>{JSON.stringify(form.getState().values, null, 2)}</code>
          </pre>
        </div>
      )}
    </Form>
  );
}
