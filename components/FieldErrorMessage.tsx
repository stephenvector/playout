import React from "react";
import { useField } from "react-final-form";

interface Props {
  name: string;
}

export default function FieldErrorMessage({ name }: Props) {
  const {
    meta: { touched, error }
  } = useField(name, {
    subscription: { error: true, touched: true }
  });

  if (!touched || !error) {
    return null;
  }

  return <div>{error}</div>;
}
