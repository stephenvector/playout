import React from "react";
import { useField } from "react-final-form";
import { Input, FormControlWrapper } from "./primitives";

type InputFieldProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  name: string;
};

export default function InputField({ name, ...otherProps }: InputFieldProps) {
  const formField = useField(name);

  return (
    <FormControlWrapper>
      <Input
        {...otherProps}
        onChange={formField.input.onChange}
        value={formField.input.value}
      />
    </FormControlWrapper>
  );
}
