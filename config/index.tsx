import {
  ContentType,
  FieldGroupField,
  ContentTypeFields,
  TextField
} from "../types";

export const CHECKBOX_FIELD = "checkbox";
export const DATE_FIELD = "date";
export const FIELD_GROUP_FIELD = "fieldgroup";
export const RADIO_FIELD = "radio";
export const RELATIONSHIP_FIELD = "relationship";
export const SELECT_FIELD = "select";
export const TIME_FIELD = "time";
export const TEXT_FIELD = "text";
export const TEXTAREA_FIELD = "textarea";

const optionsRepeatableField: FieldGroupField = {
  name: "Options",
  fieldType: FIELD_GROUP_FIELD,
  children: {
    label: {
      name: "Label",
      fieldType: "text"
    },
    value: {
      name: "String",
      fieldType: "text"
    }
  }
};

const contentTypeFieldsField: FieldGroupField = {
  name: "Fields",
  fieldType: "fieldgroup",
  repeatable: true,
  children: {
    name: {
      fieldType: "text",
      name: "Name"
    },
    type: {
      fieldType: "select",
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
    }
  }
};

export const contentTypeContentType: ContentType = {
  name: "Content Types",
  fields: {
    name: {
      name: "Name",
      fieldType: "text"
    } as TextField,
    fields: contentTypeFieldsField
  }
};
