import { shallow } from "enzyme";
import React from "react";

import App from "../pages/index";

describe("With Enzyme", () => {
  it('App shows "Home"', () => {
    const app = shallow(<App />);

    expect(app.find("div").text()).toEqual("HOME");
  });
});
