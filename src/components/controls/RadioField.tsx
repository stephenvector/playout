import React from "react";
import { useField } from "react-final-form";
import { FieldControlProps, RadioField } from "../../types";

export default function RadioField(props: FieldControlProps<RadioField>) {
  const formField = useField(props.id);

  return <ul>{props.field.options}</ul>;
}
