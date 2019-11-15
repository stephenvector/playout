import React from "react";
import {
  SelectField,
  TextField,
  TextareaField,
  FieldGroupField
} from "./controls";
import { ContentTypeField } from "../types";

type RenderFieldProps = {
  id: string;
  field: ContentTypeField;
};

export default function RenderField({ field, id }: RenderFieldProps) {
  switch (field.fieldType) {
    case "select":
      return React.createElement(SelectField, { id, field });
    case "fieldgroup":
      return React.createElement(FieldGroupField, { id, field });
    case "text":
      return React.createElement(TextField, { id, field });
    case "textarea":
      return React.createElement(TextareaField, { id, field });
  }
  return null;
}
