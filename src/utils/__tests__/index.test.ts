import { getRandomID, getYupSchemaFromContentTypeFields } from "../";

describe("getRandomID()", () => {
  it("Generates random string of given length.", () => {
    const t = getRandomID([], 8, "a");

    expect(t.length).toEqual(8);
  });
});

describe("getYupSchemaFromContentTypeFields()", () => {
  it("Should create valid schema types", () => {
    const schema = getYupSchemaFromContentTypeFields([
      {
        id: "title",
        type: "text",
        name: "Title"
      }
    ]);
  });
});
