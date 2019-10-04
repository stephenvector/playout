import React from "react";
import { Field } from "react-final-form";
import { ContentTypeField } from "../built-in-content-types";

type IdFieldProps = {
  field: ContentTypeField;
};

export default function IdField({ field }: IdFieldProps) {
  return <Field name={field.id} component="input" type="hidden" />;
}
