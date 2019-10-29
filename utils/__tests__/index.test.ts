import { getRandomID } from "../";

describe("getRandomID()", () => {
  it("Generates random string of given length.", () => {
    const t = getRandomID([], 8, "a");

    expect(t.length).toEqual(8);
  });
});
