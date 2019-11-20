import React, { useCallback } from "react";
import {
  TextFields,
  AccessTime,
  CalendarToday,
  ImageOutlined,
  CheckBoxOutlined
} from "@material-ui/icons";
import { ContentTypeField } from "../types";

const FIELD_TYPE_SELECTOR_CONFIG: {
  [key in ContentTypeField["fieldType"]]: React.ReactNode;
} = {
  text: (
    <>
      <TextFields /> Text
    </>
  ),
  checkbox: (
    <>
      <TextFields /> Checkbox
    </>
  ),
  textarea: (
    <>
      <TextFields /> Textarea
    </>
  ),
  relationship: (
    <>
      <TextFields /> Relationship
    </>
  ),
  time: (
    <>
      <TextFields /> Time
    </>
  ),
  date: (
    <>
      <TextFields /> Date
    </>
  ),
  radio: (
    <>
      <TextFields /> Radio
    </>
  ),
  fieldgroup: (
    <>
      <TextFields /> Field Group
    </>
  ),
  select: (
    <>
      <TextFields /> Select
    </>
  )
};

type FieldTypeButtonProps = {
  children: React.ReactNode;
  fieldType: ContentTypeField["fieldType"];
  selected: boolean;
  onSelectionChange(fieldType: ContentTypeField["fieldType"]): void;
};

function FieldTypeButton(props: FieldTypeButtonProps) {
  const { children, fieldType, onSelectionChange } = props;

  const handleClick = useCallback(() => {
    onSelectionChange(fieldType);
  }, [fieldType, onSelectionChange]);

  return (
    <button className="FieldTypeButton" type="button" onClick={handleClick}>
      {children}
    </button>
  );
}

type FieldTypeSelectorProps = {
  selected: ContentTypeField["fieldType"] | undefined;
  onSelectionChange(fieldType: ContentTypeField["fieldType"]): void;
};

export default function FieldTypeSelector(props: FieldTypeSelectorProps) {
  const { selected, onSelectionChange } = props;
  return (
    <div className="FieldTypeSelector">
      {Object.keys(FIELD_TYPE_SELECTOR_CONFIG).map(fieldType => (
        <FieldTypeButton
          key={fieldType}
          onSelectionChange={onSelectionChange}
          selected={fieldType === selected}
          fieldType={fieldType as ContentTypeField["fieldType"]}
        >
          {
            FIELD_TYPE_SELECTOR_CONFIG[
              fieldType as ContentTypeField["fieldType"]
            ] as React.ReactNode
          }
        </FieldTypeButton>
      ))}
    </div>
  );
}
