import React from "react";
import { FieldArray } from "react-final-form-arrays";
import {
  ConditionalField as ConditionalFieldType,
  RepeatableField as RepeatableFieldType,
  ContentTypeField
} from "../built-in-content-types";

type RepeatableFieldProps = {
  field: RepeatableFieldType;
  renderChildField(field: ContentTypeField): JSX.Element;
};

export default function RepeatableField(props: RepeatableFieldProps) {
  const field = props.field as RepeatableFieldType;
  const children = field.children;
  return (
    <FieldArray name={field.id}>
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
                  onClick={() => {
                    fieldArrayRenderProps.fields.remove(fieldIndex);
                  }}
                  type="button"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={() => {
              fieldArrayRenderProps.fields.push({});
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
