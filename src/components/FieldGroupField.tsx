import React from "react";
import {
  FieldControlProps,
  FieldGroupField as FieldGroupFieldType
} from "../types";
import RenderField from "./RenderField";

export default function FieldGroupField(
  props: FieldControlProps<FieldGroupFieldType>
) {
  const { field, id, disabled } = props;
  const { children } = field as FieldGroupFieldType;
  return (
    <div className="FieldGroupField">
      {Object.keys(children).map((childFieldId: string) => (
        <RenderField
          key={childFieldId}
          id={`${id}.${childFieldId}`}
          field={children[childFieldId]}
          disabled={disabled}
        />
      ))}
    </div>
  );
}
