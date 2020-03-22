import React from "react";
import { Form, Field, FormSpy } from "react-final-form";
import slugify from "slugify";
import pluralize from "pluralize";
import arrayMutators from "final-form-arrays";
import { FieldArray } from "react-final-form-arrays";
import { ContentType, ContentTypeField } from "../@types";
import { FIELD_TYPES } from "../constants";

interface Props {
  initialValues: ContentType;
  onSubmit(values: ContentType): Promise<void>;
}

export default function ContentTypeBuilder({ onSubmit, initialValues }: Props) {
  return (
    <div>
      <h2>Create A New Content Type</h2>
      <p>
        A content type is a model of a group of items on your site. Fields are
        just attributes on the model, like a "Title" of a page or a "Body" field
        of a blog post; and each field has its own type of . Essentially, you're
        building an "Edit" form without having to worry about keeping your data
        structured and queryable.
      </p>
      <Form<ContentType>
        mutators={{ ...arrayMutators }}
        onSubmit={onSubmit}
        initialValues={initialValues}
      >
        {({ handleSubmit, form }) => (
          <form onSubmit={handleSubmit}>
            <ol>
              <li>Name</li>
              <li>Labels</li>
              <li>Fields</li>
            </ol>

            <label>Name</label>
            <Field component="input" type="text" name="name" />

            <h4>Labels</h4>
            <p>
              Next we'll set up some kind of labels to make the terminology of
              your site fit the data.
            </p>

            <FormSpy
              subscription={{
                values: true,
                dirtyFields: true,
                touched: true
              }}
              onChange={formState => {
                form.batch(() => {
                  form.change(
                    "labels.plural",
                    pluralize.plural(formState.values.name)
                  );
                  form.change(
                    "labels.singular",
                    pluralize.singular(formState.values.name)
                  );
                  form.change("labels.slug", slugify(formState.values.name));
                });
              }}
            />

            <label>Plural</label>
            <Field component="input" type="text" name="labels.plural" />

            <label>Singular</label>
            <Field component="input" type="text" name="labels.singular" />

            <label>Slug</label>
            <Field component="input" type="text" name="labels.slug" />

            <h3>Fields</h3>
            <FieldArray<ContentTypeField> name="fields">
              {({ fields }) => (
                <div>
                  {fields.map((fieldName, index) => (
                    <div key={fieldName}>
                      <label>Name</label>
                      <Field
                        name={`${fieldName}.name`}
                        component="input"
                        type="text"
                      />
                      <Field name={`${fieldName}.type`}>
                        {({ input: { value } }) => <div>{value}</div>}
                      </Field>
                    </div>
                  ))}
                  {FIELD_TYPES.map(({ label, value }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={e => {
                        e.stopPropagation();
                        e.preventDefault();

                        // const fieldIDs = form.get

                        fields.push({
                          name: "",
                          type: value
                          // id: getRandomID(fields.map(f => f.value))
                        });
                      }}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </FieldArray>

            <button type="submit">Save Content Type</button>
          </form>
        )}
      </Form>
    </div>
  );
}
