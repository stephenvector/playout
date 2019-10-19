import React from "react";
import { Field } from "react-final-form";
import { TextField } from "../types";

interface Props {
  field: TextField;
}

export default function InputField({ field }: Props) {
  return <Field name={field.id} component="input" type={field.type} />;
}
