import _ from "lodash";

export type ContentTypeFieldType =
  | "conditional"
  | "date"
  | "time"
  | "text"
  | "image"
  | "layout"
  | "id"
  | "relationship";

export interface ContentTypeFieldBase {
  id: string;
  name: string;
  type:
    | ContentTypeFieldType
    | "fieldgroup"
    | "repeatable"
    | "select"
    | "radio"
    | "checkbox";
}

export type ConditionType = "equalto" | "notequalto";

export interface ConditionalField extends ContentTypeFieldBase {
  type: "conditional";
  children: ContentTypeField[];
  comparisonType: ConditionType;
  comparisonTargetField: string;
  comparisonTargetValue: (string | number)[];
}

export interface FieldGroupField extends ContentTypeFieldBase {
  type: "fieldgroup";
  children: ContentTypeField[];
}

export interface RepeatableField extends ContentTypeFieldBase {
  type: "repeatable";
  children: ContentTypeField[];
}

export interface SelectField extends ContentTypeFieldBase {
  type: "select";
  options: {
    label: string;
    value: string;
  }[];
}

export interface CheckboxField extends ContentTypeFieldBase {
  type: "checkbox";
  options: {
    label: string;
    value: string;
  }[];
}

export interface RadioField extends ContentTypeFieldBase {
  type: "radio";
  options: {
    label: string;
    value: string;
  }[];
}

export type ContentTypeField =
  | ContentTypeFieldBase
  | FieldGroupField
  | RepeatableField
  | SelectField
  | RadioField
  | CheckboxField
  | ConditionalField;

export type ContentType = {
  name: string;
  fields: ContentTypeField[];
};

const optionsRepeatableField: RepeatableField = {
  id: "options",
  name: "Options",
  type: "repeatable",
  children: [
    {
      id: "label",
      name: "Label",
      type: "text"
    },
    {
      id: "value",
      name: "Value",
      type: "text"
    }
  ]
};

const conditionalOptionsField: ConditionalField = {
  type: "conditional",
  id: "showoptions",
  name: "showoptions",
  comparisonType: "equalto",
  comparisonTargetField: "type",
  comparisonTargetValue: ["select", "radio", "checkbox", "multicheck"],
  children: [optionsRepeatableField]
};

const contentTypeFieldsField: RepeatableField = {
  id: "fields",
  name: "Fields",
  type: "repeatable",
  children: [
    {
      id: "name",
      type: "text",
      name: "Name"
    },
    {
      type: "select",
      id: "type",
      name: "Select",
      options: [
        {
          label: "Text",
          value: "text"
        },
        {
          label: "Date",
          value: "date"
        },
        {
          label: "Time",
          value: "time"
        },
        {
          label: "Image",
          value: "image"
        },
        {
          label: "Layout",
          value: "layout"
        },
        {
          label: "Hidden",
          value: "hidden"
        },
        {
          label: "Relationship",
          value: "relationship"
        },
        {
          label: "Field Group",
          value: "fieldgroup"
        },
        {
          label: "Repeatable",
          value: "repeatable"
        },
        {
          label: "Select",
          value: "select"
        },
        {
          label: "Radio",
          value: "radio"
        },
        {
          label: "Checkbox",
          value: "checkbox"
        }
      ]
    },
    conditionalOptionsField
  ]
};

export const contentTypeContentType: ContentType = {
  name: "Content Types",
  fields: [
    {
      id: "name",
      name: "Name",
      type: "text"
    },
    contentTypeFieldsField
  ]
};
