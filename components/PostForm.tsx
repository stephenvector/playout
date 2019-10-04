import React from "react";
import { Form } from "react-final-form";
import arrayMutators from "final-form-arrays";
import { ContentType, ContentTypeField } from "../@types";
import RenderField from "./RenderField";

export default function PostForm(props: { contentType: ContentType }) {
  function onSubmit() {}

  return (
    <Form mutators={{ ...arrayMutators }} onSubmit={onSubmit}>
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          {props.contentType.fields.map((field: ContentTypeField) => (
            <RenderField field={field} key={field.id} />
          ))}
        </form>
      )}
    </Form>
  );
}
