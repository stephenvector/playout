import {
  ContentTypeFields,
  ContentType,
  DateField,
  TimeField,
  TextField,
  RelationshipField,
  FieldGroupField,
  CheckboxField,
  RadioField,
  ContentTypeField,
  SelectField
} from "../types";

export function getRandomID(
  existingIDs: string[] = [],
  length: number = 8,
  characterSet: string = "abcdefghijklmnopqrstuvwxyz"
): string {
  const numPossibilities = Math.pow(characterSet.length, length);

  if (existingIDs.length === numPossibilities) {
    throw new Error(
      "Possible combinations exhausted! Need larget character set."
    );
  }

  let randomID = "";

  for (let i = 0; i < length; i++) {
    randomID += characterSet[Math.floor(Math.random() * characterSet.length)];
  }

  if (existingIDs.indexOf(randomID) !== -1) {
    return getRandomID(existingIDs, length);
  }

  return randomID;
}

export function getValueShapeFromContentTypeFields(fields: ContentTypeFields) {
  const valueShape: { [key: string]: any } = {};

  Object.keys(fields).forEach((fieldId: string) => {
    const field = fields[fieldId];
    const { fieldType } = field;

    let defaultValue: any = "";
    switch (fieldType) {
      case "date":
      case "time":
        defaultValue = 0;
        break;
      case "checkbox":
      case "select":
        defaultValue = "";
        break;
      case "fieldgroup":
        defaultValue = {};
        if ((field as FieldGroupField).children) {
          defaultValue = getValueShapeFromContentTypeFields(
            (field as FieldGroupField).children
          );
        }
        break;
      default:
        break;
    }
  });

  return valueShape;
}
