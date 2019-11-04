import { ContentType, FieldGroupField, TextField } from "../types";

// const optionsRepeatableField: FieldGroupField = {
//   name: "Options",
//   fieldType: "fieldgroup",
//   children: {
//     label: {
//       name: "Label",
//       fieldType: "text"
//     },
//     value: {
//       name: "String",
//       fieldType: "text"
//     }
//   }
// };

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
