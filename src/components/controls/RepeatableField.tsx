import React, { useCallback } from "react";

type RemoveButtonProps = {
  fieldIndex: number;
  removeField(indexToRemove: number): void;
};

function RemoveButton({ fieldIndex, removeField }: RemoveButtonProps) {
  const handleRemove = useCallback(() => {
    removeField(fieldIndex);
  }, [removeField, fieldIndex]);
  return (
    <button className="DeleteButton" onClick={handleRemove} type="button">
      &times;
    </button>
  );
}

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
        <div>
          {fieldArrayRenderProps.fields.map((fieldID, fieldIndex) => (
            <div className="RepeatableFieldField" key={fieldID}>
              {children.map((childField: ContentTypeField) => {
                return props.renderChildField({
                  ...childField,
                  id: `${fieldID}.${childField.id}`
                });
              })}
              <RemoveButton
                fieldIndex={fieldIndex}
                removeField={fieldArrayRenderProps.fields.remove}
              />
            </div>
          ))}

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
