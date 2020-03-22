import React from "react";
import { useField } from "react-final-form";
import { Input, Label } from "@stephenvector/prefab";
import { TextField as TextFieldType, FieldControlProps } from "../types";

export default function TextField({
  id,
  field
}: FieldControlProps<TextFieldType>) {
  const formField = useField(id);

  return (
    <>
      <Label>{field.name}</Label>
      <Input
        type="text"
        onChange={formField.input.onChange}
        value={formField.input.value}
      />
    </>
  );
}
