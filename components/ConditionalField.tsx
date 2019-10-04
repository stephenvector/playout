import React from "react";
import { useForm } from "react-final-form";
import {
  ContentTypeField,
  ConditionalField as ConditionalFieldType
} from "../built-in-content-types";

type ConditionalFieldProps = {
  field: ConditionalFieldType;
  renderChildField(field: ContentTypeField): JSX.Element;
};

export default function ConditionalField({
  field,
  renderChildField
}: ConditionalFieldProps) {
  const form = useForm();

  if (form === undefined) {
    return null;
  }

  const splitFieldId = field.id.split(".");
  const parentFieldId = splitFieldId
    .slice(0, splitFieldId.length - 1)
    .join(".");

  const comparisonTargetFieldValue = form.getFieldState(
    `${parentFieldId}.${field.comparisonTargetField}`
  );

  if (comparisonTargetFieldValue === undefined) {
    console.log(comparisonTargetFieldValue);
    return null;
  }

  if (
    field.comparisonType === "equalto" &&
    field.comparisonTargetValue.indexOf(comparisonTargetFieldValue.value) === -1
  ) {
    return null;
  }

  if (
    field.comparisonType === "notequalto" &&
    field.comparisonTargetValue.indexOf(comparisonTargetFieldValue.value) !== -1
  ) {
    return null;
  }

  return (
    <div className="ConditionalField">
      {field.children &&
        field.children.map(childField => (
          <div key={childField.id}>{renderChildField(childField)}</div>
        ))}
    </div>
  );
}
