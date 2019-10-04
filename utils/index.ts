import * as yup from "yup";
import { ContentTypeField } from "../@types";

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

export function getYupSchemaFromContentTypeFields(
  contentTypeFields: ContentTypeField[]
): yup.ObjectSchema {
  const p: {
    [k: string]:
      | yup.StringSchema
      | yup.NumberSchema
      | yup.MixedSchema
      | yup.ObjectSchema;
  } = {};

  contentTypeFields.forEach(field => {
    switch (field.type) {
      case "text":
        p[field.id] = yup
          .string()
          .required()
          .default("");
      case "time":
      case "date":
        p[field.id] = yup
          .number()
          .required()
          .default(0);
        break;
      default:
        break;
    }
  });

  const contentTypeYupSchema = yup.object().shape(p);

  return contentTypeYupSchema;
}
