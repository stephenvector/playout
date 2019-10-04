import React from "react";
import {
  FieldGroupField as FieldGroupFieldType,
  ContentTypeField
} from "../built-in-content-types";

type FieldGroupFieldProps = {
  field: FieldGroupFieldType;
  renderChildField(field: ContentTypeField): JSX.Element;
};

export default function FieldGroupField({
  field,
  renderChildField
}: FieldGroupFieldProps) {
  const { children } = field as FieldGroupFieldType;
  return (
    <div className="FieldGroupField">
      {children.map((childField: ContentTypeField) => (
        <div className="FieldGroupFieldChildField" key={childField.id}>
          {renderChildField({
            ...childField,
            id: `${field.id}.${childField.id}`
          })}
        </div>
      ))}
    </div>
  );
}
