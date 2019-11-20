import * as yup from "yup";
import mapValues from "lodash/mapValues";
import { ContentType } from "../types";
import {
  CHECKBOX_FIELD,
  DATE_FIELD,
  FIELD_GROUP_FIELD,
  RADIO_FIELD,
  RELATIONSHIP_FIELD,
  SELECT_FIELD,
  TIME_FIELD,
  TEXT_FIELD,
  TEXTAREA_FIELD
} from "../config";

export const fieldSchema = yup.object().shape({
  repeatable: yup.boolean(),
  comparisonType: yup.mixed().oneOf(["equalto", "notequalto"]),
  comparisonTargetField: yup.string(),
  comparisonTargetValue: yup.string(),
  options: yup.array().of(
    yup.object().shape({
      label: yup.string(),
      value: yup.string()
    })
  ),
  fieldType: yup
    .mixed()
    .oneOf([
      CHECKBOX_FIELD,
      DATE_FIELD,
      FIELD_GROUP_FIELD,
      RADIO_FIELD,
      RELATIONSHIP_FIELD,
      SELECT_FIELD,
      TIME_FIELD,
      TEXT_FIELD,
      TEXTAREA_FIELD
    ])
    .default(TEXT_FIELD)
    .required()
});

export const contentTypeSchema = yup.object().shape({
  name: yup.string().required(),
  fields: yup.lazy(obj =>
    yup
      .object(
        mapValues(obj as object | null | undefined, (a, b) => {
          return yup.object({
            a: yup.string().required(),
            b: fieldSchema
          });
        })
      )
      .default({})
  )
});
