import React from "react";
import { useField } from "react-final-form";
import { Input, Box } from "@stephenvector/prefab";
import { TextField as TextFieldType, FieldControlProps } from "../types";

export default function TextField({
  id,
  field
}: FieldControlProps<TextFieldType>) {
  const formField = useField(id);

  return (
    <Box marginY={2}>
      <label>{field.name}</label>
      <Input
        type="text"
        onChange={formField.input.onChange}
        value={formField.input.value}
      />
    </Box>
  );
}
