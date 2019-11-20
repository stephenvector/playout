import React from "react";
import {
  FieldControlProps,
  FieldGroupField as FieldGroupFieldType
} from "../types";
import RenderField from "./RenderField";

export default function FieldGroupField(
  props: FieldControlProps<FieldGroupFieldType>
) {
  const { field, id } = props;
  const { children } = field as FieldGroupFieldType;
  return (
    <fieldset>
      <h3>{field.name}</h3>
      {Object.keys(children).map((childFieldId: string) => (
        <RenderField
          key={childFieldId}
          id={`${id}.${childFieldId}`}
          field={children[childFieldId]}
        />
      ))}
    </fieldset>
  );
}
