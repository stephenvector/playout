import React from "react";
import ConditionalField from "./ConditionalField";
import FieldGroupField from "./FieldGroupField";
import SelectField from "./SelectField";
import RepeatableField from "./RepeatableField";
import {
  ContentTypeField,
  ConditionalField as ConditionalFieldType,
  RepeatableField as RepeatableFieldType,
  FieldGroupField as FieldGroupFieldType,
  SelectField as SelectFieldType
} from "../built-in-content-types";

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
    }

    switch (field.type) {
      case "text":
      default:
        return <input name={id} />;
    }
  }

  let hasLabel = ["conditional"].indexOf(field.type) === -1;

  return (
    <div className="RenderField">
      {hasLabel && <label>{field.name}</label>}
      {renderFieldControl(field)}
    </div>
  );
}
