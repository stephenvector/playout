import React from "react";
import { Field } from "react-final-form";

interface Props {
  name: string;
  type: "text" | "slug" | "password" | "email";
}

export default function InputField({ name, type }: Props) {
  return <Field name={name} component="input" type={type} />;
}
