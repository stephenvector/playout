import React from "react";
import styled from "@emotion/styled";
import {
  TextFields,
  AccessTime,
  CalendarToday,
  ImageOutlined,
  CheckBoxOutlined
} from "@material-ui/icons";

const FieldTypeSelectorStyled = styled.div`
  font-size: 5rem;
  button {
    font: inherit;
  }
`;

export default function FieldTypeSelector() {
  return (
    <FieldTypeSelectorStyled>
      <button type="button">
        <TextFields /> Short Text Field
      </button>
      <button type="button">
        <AccessTime /> Time
      </button>
      <button type="button">
        <CalendarToday /> Date
      </button>
      <button type="button">
        <ImageOutlined /> Image
      </button>
      <button type="button">
        <CheckBoxOutlined />
      </button>
    </FieldTypeSelectorStyled>
  );
}
