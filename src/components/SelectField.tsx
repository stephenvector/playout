import React from "react";
import { Field } from "react-final-form";
import { FieldControlProps, SelectField as SelectFieldType } from "../types";

type SelectFieldProps = FieldControlProps<SelectFieldType>;

export default ({ id, field }: SelectFieldProps) => {
  return (
    <Field component="select" type="select" name={id}>
      {field.options.map(option => {
        return (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        );
      })}
    </Field>
  );
};
