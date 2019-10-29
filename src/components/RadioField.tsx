import React from "react";
import { useField } from "react-final-form";
import styled from "@emotion/styled";
import { FieldControlProps, RadioField as RadioFieldType } from "../types";

const RadioStyled = styled.div``;

const OptionButton = styled.button``;

export default function RadioField({
  id,
  field
}: FieldControlProps<RadioFieldType>) {
  const formField = useField(id);

  return (
    <RadioStyled>
      {field.options.map(option => {
        <OptionButton key={option.value}>{option.label}</OptionButton>;
      })}
    </RadioStyled>
  );
}
