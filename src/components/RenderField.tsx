import React from "react";
import ConditionalField from "./ConditionalField";
import FieldGroupField from "./FieldGroupField";
import InputField from "./InputField";
import SelectField from "./SelectField";
import RepeatableField from "./RepeatableField";
import IdField from "./IdField";
import {
  ContentTypeField,
  TextField,
  IdField as IdFieldType,
  ConditionalField as ConditionalFieldType,
  RepeatableField as RepeatableFieldType,
  FieldGroupField as FieldGroupFieldType,
  SelectField as SelectFieldType
} from "../types";

type RenderFieldProps = {
  field: ContentTypeField;
};

export default function RenderField({ field }: RenderFieldProps) {
  function renderChildField(field: ContentTypeField) {
    return <RenderField key={field.id} field={field} />;
  }

  function renderFieldControl({ type, id }: ContentTypeField) {
    if (type === "fieldgroup") {
      return (
        <FieldGroupField
          field={field as FieldGroupFieldType}
          renderChildField={renderChildField}
        />
      );
    } else if (type === "repeatable") {
      return (
        <RepeatableField
          renderChildField={renderChildField}
          field={field as RepeatableFieldType}
        />
      );
    } else if (field.type === "select") {
      return <SelectField field={field as SelectFieldType} />;
    } else if (field.type === "conditional") {
      return (
        <ConditionalField
          field={field as ConditionalFieldType}
          renderChildField={renderChildField}
        />
      );
    } else if (field.type === "text") {
      return <InputField field={field as TextField} />;
    } else if (field.type === "id") {
      return <IdField field={field as IdFieldType} />;
    }

    return null;
  }

  let hasLabel = ["conditional"].indexOf(field.type) === -1;

  return (
    <div className="RenderField">
      {hasLabel && <label>{field.name}</label>}
      {renderFieldControl(field)}
    </div>
  );
}
