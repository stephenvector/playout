import React from "react";
import { useField } from "react-final-form";
import { Input } from "./primitives";
import { TextField as TextFieldType, FieldControlProps } from "../types";

export default function TextField({
  id,
  field
}: FieldControlProps<TextFieldType>) {
  const formField = useField(id);

  return (
    <>
      <label>{field.name}</label>
      <Input
        type="text"
        onChange={formField.input.onChange}
        value={formField.input.value}
      />
    </>
  );
}
