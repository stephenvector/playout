import React from "react";
import { Field } from "react-final-form";
import { SelectField as SelectFieldType } from "../config";

type SelectFieldProps = {
  field: SelectFieldType;
};

export default function SelectField({ field }: SelectFieldProps) {
  return (
    <Field name={field.id} component="select">
      {field.options.map((option, optionIndex) => (
        <option key={`${option.value}${optionIndex}`} value={option.value}>
          {option.label}
        </option>
      ))}
    </Field>
  );
}
