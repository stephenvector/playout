import React from "react";
import { FieldArray } from "react-final-form-arrays";
import {
  RepeatableField as RepeatableFieldType,
  ContentTypeField
} from "../config";

type RepeatableFieldProps = {
  field: RepeatableFieldType;
  renderChildField(field: ContentTypeField): JSX.Element;
};

export default function RepeatableField(props: RepeatableFieldProps) {
  const field = props.field as RepeatableFieldType;
  const children = field.children;
  return (
    <FieldArray<ContentTypeField, HTMLDivElement> name={field.id}>
      {fieldArrayRenderProps => (
        <div className="RepeatableField">
          <div className="RepeatableFieldFields">
            {fieldArrayRenderProps.fields.map((fieldID, fieldIndex) => (
              <div className="RepeatableFieldField" key={fieldID}>
                {children.map((childField: ContentTypeField) => {
                  return props.renderChildField({
                    ...childField,
                    id: `${fieldID}.${childField.id}`
                  });
                })}
                <button
                  className="DeleteButton"
                  onClick={(): void => {
                    fieldArrayRenderProps.fields.remove(fieldIndex);
                  }}
                  type="button"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={function handleAdd(): void {
              fieldArrayRenderProps.fields.push({
                type: "text",
                id: "",
                name: ""
              });
            }}
            type="button"
          >
            Add Another Item
          </button>
        </div>
      )}
    </FieldArray>
  );
}
