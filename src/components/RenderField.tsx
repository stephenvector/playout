import React, { useCallback } from "react";
import { useField, useForm } from "react-final-form";
import get from "lodash/get";
import { Button } from "./primitives";
import { ContentTypeField, FieldWithConditions } from "../types";
import { getRandomID, getDefaultFieldValue } from "../utils";
import SelectField from "./SelectField";
import TextField from "./TextField";
import TextareaField from "./TextareaField";
import FieldGroupField from "./FieldGroupField";

type RenderFieldProps = {
  id: string;
  field: ContentTypeField;
  disabled: boolean;
};

function ConditionalField({
  id,
  field,
  disabled
}: RenderFieldProps & {
  field: ContentTypeField & FieldWithConditions;
}) {
  const form = useForm();
  const {
    comparisonTargetField,
    comparisonTargetValue,
    comparisonType
  } = field;

  const formValues = form.getState().values;
  const targetValue = get(formValues, comparisonTargetField);

  if (comparisonType === "equalto" && targetValue !== comparisonTargetValue) {
    return null;
  }

  if (
    comparisonType === "notequalto" &&
    targetValue === comparisonTargetValue
  ) {
    return null;
  }

  const fieldWithoutConditions = { ...field };
  delete fieldWithoutConditions["comparisonTargetField"];
  delete fieldWithoutConditions["comparisonTargetValue"];
  delete fieldWithoutConditions["comparisonType"];

  return (
    <RenderField disabled={disabled} id={id} field={fieldWithoutConditions} />
  );
}

type RepeatableFieldRowProps = {
  id: string;
  removeItem(id: string): void;
  children: React.ReactNode;
};

function RepeatableFieldRow(props: RepeatableFieldRowProps) {
  const { removeItem, children, id } = props;

  const handleRemove = useCallback(() => {
    removeItem(id);
  }, [id, removeItem]);

  return (
    <div>
      <div>{children}</div>
      <button type="button" onClick={handleRemove}>
        &times;
      </button>
    </div>
  );
}

function RepeatableField({ field, id, disabled }: RenderFieldProps) {
  const formField = useField<{ [key: string]: any }>(id);

  const addAnotherItem = useCallback(() => {
    formField.input.onChange({
      ...formField.input.value,
      [getRandomID(Object.keys(formField.input.value))]: getDefaultFieldValue(
        field
      )
    });
  }, [formField.input, field]);

  const removeItem = useCallback(
    (itemId: string) => {
      const newValue = { ...formField.input.value };
      console.log(itemId);
      delete newValue[itemId];
      formField.input.onChange(newValue);
      console.log(newValue);
    },
    [formField.input]
  );

  return (
    <div>
      <div>
        {Object.keys(formField.input.value).map(fieldKey => {
          const individualItemField = { ...field };
          individualItemField.repeatable = false;
          const individualItemId = `${id}.${fieldKey}`;
          return (
            <RepeatableFieldRow
              key={individualItemId}
              id={fieldKey}
              removeItem={removeItem}
            >
              <RenderField
                disabled={disabled}
                field={individualItemField}
                id={individualItemId}
              />
            </RepeatableFieldRow>
          );
        })}
      </div>
      <div>
        <Button onClick={addAnotherItem} type="button">
          Add Another
        </Button>
      </div>
    </div>
  );
}

export default function RenderField({ field, id, disabled }: RenderFieldProps) {
  // Handle conditional fields
  if (
    (field as ContentTypeField & FieldWithConditions).comparisonTargetField !==
      undefined &&
    (field as ContentTypeField & FieldWithConditions).comparisonTargetValue !==
      undefined &&
    (field as ContentTypeField & FieldWithConditions).comparisonType !==
      undefined
  ) {
    return (
      <ConditionalField
        disabled={disabled}
        field={field as ContentTypeField & FieldWithConditions}
        id={id}
      />
    );
  }

  // Handle repeatable fields
  if (field.repeatable === true) {
    return <RepeatableField disabled={disabled} field={field} id={id} />;
  }

  // Handle the fields without special cases
  switch (field.fieldType) {
    case "select":
      return <SelectField id={id} field={field} disabled />;
    case "fieldgroup":
      return React.createElement(FieldGroupField, { id, field, disabled });
    case "text":
      return React.createElement(TextField, { id, field, disabled });
    case "textarea":
      return React.createElement(TextareaField, { id, field, disabled });
  }
  return null;
}
