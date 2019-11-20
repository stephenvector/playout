import React from "react";
import { useField } from "react-final-form";
<<<<<<< HEAD:components/TextField.tsx
import { Input, Box } from "@stephenvector/prefab";
=======
import { Input } from "./primitives";
>>>>>>> master:src/components/TextField.tsx
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
