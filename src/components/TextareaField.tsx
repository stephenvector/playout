import React from "react";
import { useField } from "react-final-form";
import { TextareaField, FieldControlProps } from "../types";

export default function InputField({
  id,
  field
}: FieldControlProps<TextareaField>) {
  const formField = useField(id);

  return (
    <div>
      <label>{field.name}</label>
      <textarea
        onChange={formField.input.onChange}
        value={formField.input.value}
      />
    </div>
  );
}
