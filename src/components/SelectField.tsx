import React from "react";
import { useField } from "react-final-form";
import { Select } from "@stephenvector/prefab";
import { FieldControlProps, SelectField as SelectFieldType } from "../types";

type SelectFieldProps = FieldControlProps<SelectFieldType>;

export default ({ id, field }: SelectFieldProps) => {
  const formField = useField(id)
  return (
    <Select
      onChange={formField.input.onChange}
      value={formField.input.value}
      options={field.options}
    />
  );
};
